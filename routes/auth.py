from flask import Blueprint, request, jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app import mongo
import re
from app import mongo

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # Required Fields
    required_fields = ["full_name", "email", "contact_number", "password"]

    # Ensure all required fields are present
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({"message": f"Missing required fields: {', '.join(missing_fields)}"}), 400  # 400 Bad Request

    email = data["email"].strip().lower()  # Normalize email
    contact_number = data["contact_number"].strip()
    full_name = data["full_name"].strip()
    password = data["password"]

    # Validate password length
    if len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters long"}), 400

    # Validate contact number (10 digits, no chars, no leading 0)
    if not re.fullmatch(r"^[1-9]\d{9}$", contact_number):
        return jsonify({"message": "Contact number must be exactly 10 digits and cannot start with 0"}), 400

    # Check if email or contact number already exists
    if mongo.db.users.find_one({"$or": [{"email": email}, {"contact_number": contact_number}]}):
        return jsonify({"message": "Email or contact number already exists"}), 400

    # Hash password
    hashed_password = generate_password_hash(password).decode("utf-8")

    # Insert user into MongoDB (Including any extra properties)
    new_user = {
        "full_name": full_name,
        "email": email,
        "contact_number": contact_number,
        "password": hashed_password
    }
    
    # Add extra fields if provided
    for key, value in data.items():
        if key not in required_fields:  # Allow additional fields
            new_user[key] = value

    mongo.db.users.insert_one(new_user)

    return jsonify({"message": "User registered successfully"}), 201  # 201 Created

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({"email": data["email"]})

    if user and check_password_hash(user["password"], data["password"]):
        # Include email in the token payload
        access_token = create_access_token(
            identity=str(user["_id"]),
            additional_claims={"email": user["email"]}
        )
        
        return jsonify({"token": access_token}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

