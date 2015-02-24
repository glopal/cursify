var smoothstep = require('smoothstep');

module.exports = function(paths) {
  var smoothedPaths = [];
  var smoothed;
  var path;

  for(var i = 0; i < paths.length; i++) {
    path = paths[i];
    smoothed = [];
    for(var s = 0; s <= path[i].length; s++) {
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

  return smoothedPaths;
}
