from flask import Flask
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Database Setup
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Register Blueprints
from routes.auth import auth_bp
from routes.user import user_bp
from routes.upload import upload_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(upload_bp, url_prefix="/upload")

if __name__ == "__main__":
    app.run(debug=True)
