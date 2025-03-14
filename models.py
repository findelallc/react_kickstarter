from bson import ObjectId

class User:
    """User model for MongoDB"""

    def __init__(self, email, password, full_name, contact_number, age=None, address=None):
        self.email = email
        self.password = password
        self.full_name = full_name
        self.contact_number = contact_number
        self.age = age
        self.address = address

    def to_dict(self):
        """Convert the user object to a dictionary (for MongoDB)"""
        return {
            "email": self.email,
            "password": self.password,
            "full_name": self.full_name,
            "contact_number": self.contact_number,
            "age": self.age,
            "address": self.address
        }


class File:
    """File model for MongoDB"""

    def __init__(self, email, file_url):
        self.email = email
        self.file_url = file_url

    def to_dict(self):
        """Convert the file object to a dictionary (for MongoDB)"""
        return {
            "email": self.email,
            "file_url": self.file_url
        }
