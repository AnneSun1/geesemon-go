from app import create_app
from flask_cors import CORS 
from flask_socketio import SocketIO

app = create_app()
CORS(app)
socketio = SocketIO(app)


    
if __name__ == "__main__":
    # app.run(debug=True, host="0.0.0.0", port=3000)
    from app import socketio
    socketio.run(app, debug=True, host="0.0.0.0", port=3000)
