# STEP 1: The Device / Firmware (firmware_device.py)
# Its only job: Measure temperature and send it to the backend.

import random
import urllib.request
import json

# 1. Read the physical sensor (simulated with a random number)
measured_temp = round(20.0 + random.random() * 10.0, 1)
print(f"Device: Measured temperature is {measured_temp} C")

# 2. Package the reading into a format to send over the network
data_to_send = json.dumps({"temperature": measured_temp}).encode("utf-8")

# 3. Send it to the backend via POST
req = urllib.request.Request(
    url="http://127.0.0.1:5000",
    data=data_to_send,
    headers={"Content-Type": "application/json"}
)

# 4. Open connection and deliver
with urllib.request.urlopen(req) as response:
    print(f"Device: Backend received the data successfully!")
