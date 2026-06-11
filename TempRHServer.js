const express = require('express');
const mqtt = require('mqtt');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', () => {
  fetchWeather();
});

// Connect to local Mosquitto broker
const mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('home/sensor/#');
});

// When a sensor message arrives, forward it to all browser clients
mqttClient.on('message', (topic, message) => {
  console.log(`${topic}: ${message.toString()}`);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ topic, data: message.toString() }));
    }
  });
});

const https = require('https');

function fetchWeather() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=51.4123&longitude=-0.3007&current=temperature_2m,relative_humidity_2m,weathercode&timezone=Europe/London';
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const weather = JSON.parse(data).current;
      const payload = JSON.stringify({
        topic: 'weather/forecast',
        data: JSON.stringify(weather)
      });
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    });
  });
}

// Fetch immediately and then every 10 minutes
fetchWeather();
setInterval(fetchWeather, 600000);

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Server running locally at http://localhost:3000');
});