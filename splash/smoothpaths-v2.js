var smoothstep = require('smoothstep');
var line = require('bresenham');

function getSmallIndex(index, smallerLength) {
  if(index >= smallerLength) {
    return getSmallIndex(index - smallerLength, smallerLength);
  } else {
    return index;
  }
}
function connect(startPoints, endPoints) {
  var paths = [];
  var larger = startPoints.length;
  var smaller = endPoints.length;
  var endSmaller = true;
  var smallIndex,ei,si;

  if(larger < smaller) {
    smaller = larger;
    larger = endPoints.length;
    endSmaller = false;
  }

  for(var i = 0; i < larger; i++) {
    smallIndex = getSmallIndex(i,smaller);
    ei = endSmaller ? smallIndex : i;
    si = endSmaller ? i : smallIndex;

    paths.push(line(endPoints[ei].x,endPoints[ei].y,startPoints[si].x,startPoints[si].y));
  }


  return paths;
}

module.exports = function(startPoints, endPoints) {
  var paths = connect(startPoints, endPoints);
  var smoothedPaths = [];
  var smoothed;
  var path;

  var maxLength = 0;

  for(var i = 0; i < paths.length; i++) {
    path = paths[i];
    if(path.length > maxLength) maxLength = path.length;

    smoothed = [];
    for(var s = 0; s <= path.length; s++) {
      //console.log(path.length + " " + parseInt(smoothstep(0,path.length,s) * path.length,10));
      index = parseInt(smoothstep(0,path.length,s) * path.length,10);
      index = (index < 0) ? 0 : index;
      // index = (index > path.length - 1) ? path.length - 1 : index;

      if(index >= path.length - 1)
      {
        smoothed.push(path[path.length - 1]);
        break;
      }
      smoothed.push(path[index]);
    }
    smoothedPaths.push(smoothed);
  }
  if(this.equalize) {
    for(var i = 0; i < smoothedPaths.length; i++) {
      path = smoothedPaths[i];
      if(path.length < maxLength) {
        var difference = maxLength - path.length;
        var lastPoint = this.emptyFill ? [{}] : path[path.length-1];
        for(var c = 0; c < difference; c++) {
          path.push(lastPoint);
        }
      }
    }
  }

  return smoothedPaths;
}

module.exports.noEase = function(startPoints, endPoints) {
  return connect(startPoints, endPoints);
}
