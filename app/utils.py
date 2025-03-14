import re
import bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta
import os

def hash_password(password):
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def check_password(password, hashed_password):
    """Check if a password matches the stored hashed password"""
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


def generate_jwt_token(identity, email):
    """Generate JWT token"""
    return create_access_token(identity=str(identity), additional_claims={"email": email}, expires_delta=timedelta(hours=1))


def validate_email(email):
    """Validate email format"""
    email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return re.match(email_regex, email) is not None


def validate_contact_number(contact_number):
    """Validate contact number: 10 digits, no characters, cannot start with 0"""
    contact_regex = r"^[1-9][0-9]{9}$"
    return re.match(contact_regex, contact_number) is not None


def get_env_variable(var_name, default_value=None):
    """Get environment variable safely"""
    return os.getenv(var_name, default_value)
