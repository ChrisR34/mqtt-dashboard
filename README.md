\# MQTT Sensor Dashboard



A real-time IoT sensor dashboard built with Node.js, MQTT, and WebSockets.



\## Features

\- Live temperature and humidity readings from ESP32 + DHT22 sensor

\- Real-time weather forecast for Kingston upon Thames via Open-Meteo API

\- Dynamic weather icons based on current conditions

\- Live message log



\## Tech Stack

\- \*\*Backend:\*\* Node.js, Express, WebSockets

\- \*\*Broker:\*\* Mosquitto MQTT

\- \*\*Frontend:\*\* HTML, CSS, JavaScript

\- \*\*Hardware:\*\* ESP32 + DHT22 sensor (coming soon)

\- \*\*Weather API:\*\* Open-Meteo (free, no API key needed)



\## How to Run

1\. Install and start Mosquitto broker

2\. Run `npm install`

3\. Run `node TempRHServer.js`

4\. Open `http://localhost:3000`



\## Hardware (Coming Soon)

ESP32 + DHT22 sensor publishing real temperature and humidity via MQTT over WiFi.

