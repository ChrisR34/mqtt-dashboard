const express = require('express');
const mqtt = require('mqtt');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

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

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('Server running locally at http://localhost:3000');
});