from app import create_app
from app.extensions import SocketIO
from flask_cors import CORS

app = create_app()
# SocketIO=SocketIO(app)
# SocketIO.init_app(app)
CORS(app)
SocketIO.init_app(app, cors_allowed_origins="*")
if __name__ == "__main__":
    # app.run(debug=True, host="0.0.0.0", port=3000, use_reloader=False)
    SocketIO.run(app, debug=True, host="0.0.0.0", port=3000, use_reloader=False)
