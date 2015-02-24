var Canvas = require('drawille');
var line = require('bresenham');
var Watercolor = require('watercolor'),
    watercolor = Watercolor({
        style : 'normal',
        color : 'green'
    });

var logoWidth = 160;
var logoHeight = 45;
var logoData = require("./logo.js");
var logoCoords = [];
var canvas = new Canvas(160, 92);

for(var r = 0; r < logoHeight; r++) {
  for(var c = 0; c < logoWidth; c++) {
    if(logoData[r*logoWidth+c] == 1)
      logoCoords.push([0 + c,20 + r]);
  }
}

var pixel;
var timer;

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var paths = [];

for(var i = 0; i < logoCoords.length; i++) {
  paths.push(line(randomInt(0,159),randomInt(0,91),logoCoords[i][0],logoCoords[i][1]).reverse());
}

var staticPixels = [];

var currentPixel;

function draw() {
  canvas.clear();
  for(var i = 0; i < paths.length; i++) {
    if (staticPixels.length != 2309 ) {
      if(paths[i].length != 0) {
        if(paths[i].length == 1) {
          staticPixels.push(paths[i].pop());
        } else {
          currentPixel = paths[i].pop();
          //if(currentPixel == undefined) {console.log(staticPixels.length)};
          canvas.set(currentPixel['x'], currentPixel['y']);
        }
      }
    } else{ clearInterval(timer);}
  }

  for(var i = 0; i < staticPixels.length; i++) {
    currentPixel = staticPixels[i];
    canvas.set(currentPixel['x'], currentPixel['y']);
  }

  watercolor.write(canvas.frame());
}

watercolor.pipe(process.stdout);

timer = setInterval(draw, 50);
