import requests
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity,get_jwt
from bson import ObjectId
from flask_bcrypt import check_password_hash, generate_password_hash
from app import mongo

user_bp = Blueprint("user", __name__)

@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    email_param = request.args.get("email")  # Get email from query param (if provided)
    claims = get_jwt()
    auth_email = claims.get("email")  # Get email from JWT

    search_email = email_param if email_param else auth_email

    user = mongo.db.users.find_one({"email": search_email}, {"password": 0, "_id": 0})
    
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user), 200

@user_bp.route("/update", methods=["PATCH"])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    data = request.get_json()

    # Minimum required fields that must always be present
    required_updates = {"full_name", "email", "contact_number"}

    # Ensure all required fields are present
    missing_fields = [field for field in required_updates if field not in data or not data[field]]
    if missing_fields:
        return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    try:
        mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": data})
    except:
        return jsonify({"message": "Failed to update user"}), 500

    return jsonify({"message": "User details updated successfully"}), 200

@user_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    data = request.get_json()

    # Ensure both old and new passwords are provided
    if "old_password" not in data or "new_password" not in data:
        return jsonify({"message": "Old password and new password are required"}), 400

    try:
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found"}), 404
    except:
        return jsonify({"message": "Invalid User ID"}), 400

    # Check if the old password matches
    if not check_password_hash(user["password"], data["old_password"]):
        return jsonify({"message": "Old password is incorrect"}), 400

    # Validate new password length
    if len(data["new_password"]) < 8:
        return jsonify({"message": "New password must be at least 8 characters long"}), 400

    # Hash the new password and update it in the database
    hashed_password = generate_password_hash(data["new_password"]).decode("utf-8")
    mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"password": hashed_password}})

    return jsonify({"message": "Password changed successfully"}), 200

@user_bp.route("/info", methods=["GET"])
@jwt_required()
def get_user_info():
    try:
        # Get user's public IP details
        ip_info = requests.get("https://ipinfo.io/json").json()
        
        # Get browser & device details from request headers
        browser_info = request.headers.get("User-Agent", "Unknown")
        
        return jsonify({
            "message": "User information retrieved successfully",
            "ip_details": ip_info,
            "browser_info": browser_info
        }), 200
    except Exception as e:
        return jsonify({"message": "Failed to fetch user info", "error": str(e)}), 500