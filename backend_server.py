# STEP 2: The Backend Server (backend_server.py)
# Its only job: Hold data in memory and answer requests from the network.

from http.server import HTTPServer, BaseHTTPRequestHandler
import json

# This variable is our mini database:
current_temperature = 24.5

class RequestHandler(BaseHTTPRequestHandler):

    # 1. When the browser asks for the temperature:
    def do_GET(self):
        # Allow any browser to read this data (CORS permission)
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        # Send the number as text across the network
        response_text = json.dumps({"temperature": current_temperature})
        self.wfile.write(response_text.encode("utf-8"))

    # 2. When the hardware device sends a new temperature:
    def do_POST(self):
        global current_temperature
        
        # Read the incoming data sent by the device
        data_size = int(self.headers["Content-Length"])
        incoming_data = self.rfile.read(data_size)
        
        # Convert incoming text back to Python data and update our variable
        parsed = json.loads(incoming_data)
        current_temperature = parsed["temperature"]

        # Reply with a thumbs up
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(b"OK")

# Start listening on port 5000:
print("Backend running at http://127.0.0.1:5000")
HTTPServer(("127.0.0.1", 5000), RequestHandler).serve_forever()
