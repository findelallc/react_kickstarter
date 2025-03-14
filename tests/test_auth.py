import json

def test_register(client):
    """Test user registration"""
    data = {
        "full_name": "John Doe",
        "email": "john@example.com",
        "contact_number": "9876543210",
        "password": "securePass123"
    }
    response = client.post("/auth/register", json=data)
    assert response.status_code == 201
    assert response.json["message"] == "User registered successfully"

def test_login(client):
    """Test user login"""
    data = {"email": "john@example.com", "password": "securePass123"}
    response = client.post("/auth/login", json=data)
    assert response.status_code == 200
    assert "access_token" in response.json

def test_profile(client, auth_token):
    """Test fetching user profile"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.get("/user/profile", headers=headers)
    assert response.status_code == 200
    assert "email" in response.json
