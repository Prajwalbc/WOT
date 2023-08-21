const express = require('express');
const app = express();
const cors = require('cors');
// const path = require('path');

var five = require("johnny-five");

// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.send("server is running");
});

var board = new five.Board();
var led;

board.on('ready', () => {
  led = new five.Led(13);
})

app.get('/led/on', (req, res) => {
  led.on();
  res.send('LED turned on');
});

app.get('/led/off', (req, res) => {
  led.off();
  res.send('LED turned off');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


// var five = require("johnny-five");
// var board = new five.Board();
// board.on("ready", function() {
//   var led = new five.Led(13);
//   led.strobe();
// });