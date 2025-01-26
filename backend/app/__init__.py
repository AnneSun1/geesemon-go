from flask import Flask
from app.routes import api
# from app import socketio 
from flask_socketio import SocketIO

def create_app():
    app = Flask(__name__)
    SocketIO=SocketIO(app)
    socketio.init_app(app)
    # Register blueprints
    app.register_blueprint(api, url_prefix="/api")

    return app
