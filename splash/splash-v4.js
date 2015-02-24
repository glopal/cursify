var Canvas = require('drawille');
var line = require('bresenham');
var smoothstep = require('smoothstep');
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
var path;
var smoothed;
var index;

for(var i = 0; i < logoCoords.length; i++) {
  path = line(randomInt(0,159),randomInt(0,91),logoCoords[i][0],logoCoords[i][1]).reverse();
  smoothed = [];
  for(var s = 0; s <= parseInt(path.length/2); s++) {
    //console.log(path.length + " " + parseInt(smoothstep(0,path.length,s) * path.length,10));
    index = parseInt(smoothstep(0,path.length,s) * path.length,10);
    index = (index < 0) ? 0 : index;
    index = (index > path.length - 1) ? path.length - 1 : index;
    smoothed.push(path[index]);
  }
  paths.push(smoothed);
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
          //if(currentPixel == undefined) {console.log(paths[i])};
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
