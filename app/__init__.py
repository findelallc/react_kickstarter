from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from config import Config

mongo = PyMongo()
jwt = JWTManager()

def create_app(testing=False):
    """Flask application factory"""
    app = Flask(__name__)
    app.config.from_object(Config)

    if testing:
        app.config["TESTING"] = True
        app.config["MONGO_URI"] = "mongodb://localhost:27017/test_db"  # Use a test DB

    mongo.init_app(app)
    jwt.init_app(app)

    # Import and register blueprints
    from app.routes.auth import auth_bp
    from app.routes.user import user_bp
    from app.routes.upload import upload_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(upload_bp, url_prefix="/upload")

    return app
