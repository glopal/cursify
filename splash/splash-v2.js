var Canvas = require('drawille');
var TWEEN = require('tween.js');
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
var finalCanvas = new Canvas(160, 92);

for(var r = 0; r < logoHeight; r++) {
  for(var c = 0; c < logoWidth; c++) {
    if(logoData[r*logoWidth+c] == 1) {
      logoCoords.push([0 + c,20 + r]);
    }
  }
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var timer;

var update = function() {
  canvas.set(this.x,this.y);
};

var staticPixels = [];
var currentPixel;
var completed = 0; //require("after")(logoCoords.length,function(){clearInterval(timer);});

for(var i = 0; i < logoCoords.length; i++) {
  new TWEEN.Tween({ x: randomInt(0,159), y: randomInt(0,91) })
        .to({x: logoCoords[i][0],y: logoCoords[i][1]}, 4000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(update)
        .onComplete(function() {
          staticPixels.push([this.x,this.y]);
          canvas.set(this.x,this.y);
          completed++;

          if(completed == logoCoords.length) {
            clearInterval(timer);
          }
        })
        .start();
}


watercolor.pipe(process.stdout);

function draw() {
    canvas.clear();
    TWEEN.update();
    for(var i = 0; i < staticPixels.length; i++) {
      currentPixel = staticPixels[i];
      canvas.set(currentPixel[0], currentPixel[1]);
    }
    watercolor.write(canvas.frame());
}

timer = setInterval(draw, 50);
