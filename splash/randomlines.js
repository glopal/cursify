var line = require('bresenham');

function randomInt (high) {
    return Math.floor(Math.random() * high);
}

module.exports = function(width, height, endPoints) {
  var paths = [];
  for(var i = 0; i < endPoints.length; i++) {
    paths.push(line(randomInt(width),randomInt(height),endPoints[i].x,endPoints[i].y).reverse());
  }

  return paths;
}
