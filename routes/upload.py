import boto3
import uuid
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from config import Config
from app import mongo
from bson import ObjectId  # Import ObjectId for MongoDB queries

upload_bp = Blueprint("upload", __name__)

# Initialize S3 client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=Config.AWS_ACCESS_KEY,
    aws_secret_access_key=Config.AWS_SECRET_KEY,
    region_name=Config.AWS_REGION
)

@upload_bp.route("/file", methods=["POST"])
@jwt_required()
def upload_file():
    if "file" not in request.files:
        return jsonify({"message": "No file provided"}), 400  # 400 Bad Request

    files = request.files.getlist("file")  # Get multiple files
    if not files:
        return jsonify({"message": "No valid files received"}), 400  # 400 Bad Request

    # Get authenticated user ID
    user_id = get_jwt_identity()
    
    try:
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    except:
        return jsonify({"message": "Invalid User ID"}), 400  # 400 Bad Request

    if not user:
        return jsonify({"message": "User not found"}), 404  # 404 Not Found

    email = user["email"]

    uploaded_files = []

    for file in files:
        file_ext = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4()}.{file_ext}"
        file_id = str(ObjectId())  # Generate a unique file_id

        try:
            # Upload to S3
            s3_client.upload_fileobj(file, Config.AWS_BUCKET_NAME, file_name)

            # Generate S3 URL
            file_url = f"https://{Config.AWS_BUCKET_NAME}.s3.{Config.AWS_REGION}.amazonaws.com/{file_name}"

            # Save file details in MongoDB
            mongo.db.files.insert_one({
                "_id": ObjectId(file_id),
                "file_id": file_id,
                "email": email,
                "file_url": file_url
            })

            uploaded_files.append({"file_id": file_id, "file_url": file_url})
        except Exception as e:
            return jsonify({"message": "File upload failed", "error": str(e)}), 500  # 500 Internal Server Error

    return jsonify({"message": "File(s) uploaded successfully", "uploaded_files": uploaded_files}), 201  # 201 Created


@upload_bp.route("/files", methods=["GET"])
@jwt_required(optional=True)  # Allow access even without JWT
def get_files():

    # claims = get_jwt()
    # user_email = claims.get("email")
    email = request.args.get("email")  # Get email from query params

    query = {}  # Default: fetch all files
    if email:
        query["email"] = email  # Filter by email if provided

    # Fetch files based on the query
    files = list(mongo.db.files.find(query, {"_id": 0, "email": 0}))  # Exclude _id from response

    if not files:
        return jsonify({"message": "No files found"}), 404  # 404 if no files exist

    return jsonify({"message": "Files retrieved successfully", "files": files}), 200


@upload_bp.route("/file/<file_id>", methods=["DELETE"])
@jwt_required()
def delete_file(file_id):
    try:
        # Get authenticated user's email from JWT
        claims = get_jwt()
        user_email = claims.get("email")

        # Fetch the file details from the database
        file_record = mongo.db.files.find_one({"_id": ObjectId(file_id)})

        if not file_record:
            return jsonify({"message": "File not found"}), 404

        # Check if the file belongs to the authenticated user
        if file_record["email"] != user_email:
            return jsonify({"message": "Unauthorized: You can only delete your own files"}), 403

        # Extract file name from the S3 URL
        file_url = file_record["file_url"]
        file_name = file_url.split("/")[-1]

        # Delete file from S3
        s3_client.delete_object(Bucket=Config.AWS_BUCKET_NAME, Key=file_name)

        # Remove file record from MongoDB
        mongo.db.files.delete_one({"_id": ObjectId(file_id)})

        return jsonify({"message": "File deleted successfully"}), 200

    except Exception as e:
        return jsonify({"message": "Error deleting file", "error": str(e)}), 500

