function randomInt (high) {
    return Math.floor(Math.random() * high);
}

module.exports.edge = function(width, height, count) {
  var points = [];
  for(var i = 0; i < count; i++) {
    points.push({x: randomInt(width), y: randomInt(height)});
  }

  return points;
}
