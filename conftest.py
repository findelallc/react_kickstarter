import pytest
from app import create_app  # Import your Flask app factory function
from flask_jwt_extended import create_access_token
from mongomock import MongoClient

@pytest.fixture
def client():
    """Create a Flask test client with a mock database"""
    app = create_app(testing=True)  # Pass testing=True to use a test config
    app.config["TESTING"] = True
    app.config["MONGO_CLIENT"] = MongoClient()  # Use in-memory MongoDB

    with app.test_client() as client:
        yield client

@pytest.fixture
def auth_token():
    """Generate a JWT token for authentication"""
    return create_access_token(identity="test_user", additional_claims={"email": "test@example.com"})
