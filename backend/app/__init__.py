from flask import Flask
from app.routes import api
from app.extensions import SocketIO 
from flask_cors import CORS 

def create_app():
    app = Flask(__name__)


    # Register blueprints
    app.register_blueprint(api, url_prefix="/api")
    
    return app
