def test_upload_file(client, auth_token):
    """Test file upload"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    data = {"file": (open("testfile.pdf", "rb"), "testfile.pdf")}
    
    response = client.post("/upload/file", headers=headers, data=data, content_type="multipart/form-data")
    assert response.status_code == 200
    assert "url" in response.json

def test_get_my_files(client, auth_token):
    """Test fetching uploaded files"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = client.get("/upload/files", headers=headers)
    
    assert response.status_code == 200
    assert isinstance(response.json["files"], list)

def test_delete_file(client, auth_token):
    """Test deleting a file uploaded by the user"""
    headers = {"Authorization": f"Bearer {auth_token}"}
    file_id = "some-file-id"
    response = client.delete(f"/upload/file/{file_id}", headers=headers)
    
    assert response.status_code == 200
    assert response.json["message"] == "File deleted successfully"
