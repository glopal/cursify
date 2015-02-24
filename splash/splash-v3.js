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

var start = function(){
  this.positions = [];
}

var update = function() {
  this.positions.push([this.x,this.y]);
};

var completed = require("after")(logoCoords.length,function(){clearInterval(timer);});

for(var i = 0; i < logoCoords.length; i++) {
  new TWEEN.Tween({ x: randomInt(0,159), y: randomInt(0,91) })
        .to({x: logoCoords[i][0],y: logoCoords[i][1]}, 4000)
        .easing(TWEEN.Easing.Cubic.Out)
        .onStart(start)
        .onUpdate(update)
        .onComplete(completed)
        .start();
}

function draw() {

    TWEEN.update(0);
}

timer = setInterval(draw);
