function randomInt (high) {
    return Math.floor(Math.random() * high);
}

var rpoints = {
  edge : function(width, height, count) {
    var points = [];
    for(var i = 0; i < count; i++) {
      points.push({x: randomInt(width), y: randomInt(height)});
    }

    return points;
  }
};

module.exports.rpoints = rpoints;
module.exports.offset = function(xOffset,yOffset,coords) {
  offsetCoords = [];

  for(var i = 0; i < coords.length; i++) {
    offsetCoords.push({x: coords[i].x + xOffset, y: coords[i].y + yOffset});
  }

  return offsetCoords;
}
