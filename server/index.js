const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

var five = require("johnny-five");

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  // res.send("server is running");
});

var board = new five.Board();
var led;
var proximity;
var thermometer;

board.on('ready', () => {
  // led initiaization
  led = new five.Led(13);

  // ultra sonic initialization
  // Upload pingFirmata onto the arduino board.
  // CMD : npm install nodebots-interchange -g
  // CMD : interchange install hc-sr04 -a uno -p /dev/ttyACM0 --firmata
  proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 8
  });

  proximity.on("change", () => {
    // const { centimeters, inches } = proximity;
    // console.log(centimeters + " cm");
    // console.log(inches + " inches");
    // console.log("-----------");
  });

  // LM35 temperature sensor initialization
  thermometer = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });
  thermometer.on("change", () => {
    // const {celsius, fahrenheit, kelvin} = thermometer;
    // console.log("Thermometer");
    // console.log("  celsius      : ", celsius);
    // console.log("  fahrenheit   : ", fahrenheit);
    // console.log("  kelvin       : ", kelvin);
    // console.log("--------------------------------------");
  });
})

// led api
app.get('/api/led/on', (req, res) => {
  led.on();
  res.send('LED turned on');
});

app.get('/api/led/off', (req, res) => {
  led.off();
  res.send('LED turned off');
});

// Ultrasonic api
app.get('/api/getDistance', async (req, res) =>{
  const { centimeters } = proximity;
  res.json({ distance: centimeters });
});

// Temperature api
app.get('/api/getTemperature', async (req, res) =>{
  const {celsius, fahrenheit, kelvin} = thermometer;
  res.json({ distance: {celsius : celsius, fahrenheit : fahrenheit, kelvin: kelvin} });
});

// PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});