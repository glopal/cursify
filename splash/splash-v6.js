var Canvas = require('drawille');
var randomlines = require('./randomlines.js');
var smoothpaths = require('./smoothpaths.js');
var Watercolor = require('watercolor'),
    watercolor = Watercolor({
        style : 'normal',
        color : 'green'
    });

var logo = require("./logo.js");
var canvas = new Canvas(160, 92);
var paths = smoothpaths(randomlines(159,91,logo.getCoords()));
var timer;
var staticPixels = [];
var currentPixel;
var totalPixels = logo.getTotalPixels();

function draw(callback) {
  canvas.clear();

  for(var i = 0; i < paths.length; i++) {
    if (staticPixels.length != totalPixels) {
      if(paths[i].length != 0) {
        if(paths[i].length == 1) {
          staticPixels.push(paths[i].pop());
        } else {
          currentPixel = paths[i].pop();
          canvas.set(currentPixel['x'], currentPixel['y']);
        }
      }
    } else{ console.log("DFSFSDFSDFSDF");clearInterval(timer); setTimeout(function(){callback(canvas);},1000);}
  }

  for(var i = 0; i < staticPixels.length; i++) {
    currentPixel = staticPixels[i];
    canvas.set(currentPixel['x'], currentPixel['y']);
  }

  watercolor.write(canvas.frame());
}

module.exports = function(callback) {
  watercolor.pipe(process.stdout);

  timer = setInterval(function(){draw(callback);}, 50);
}
