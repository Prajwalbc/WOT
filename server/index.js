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

board.on('ready', () => {
  // led initiaization
  led = new five.Led(13);

  // ultra sonic initialization
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

// PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});