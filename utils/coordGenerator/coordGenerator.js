var fs = require("fs");

fs.readFile('input.txt',{encoding:"utf-8"}, function (err, data) {
  if (err) throw err;

  var pixels = data.split(",");
  var coords = [];
  var width = process.argv[2];
  var height = process.argv[3];

  for(var r = 0; r < height; r++) {
    for(var c = 0; c < width; c++) {
      if(pixels[r*width+c] == 1)
      coords.push("{x: " + c + ", y: " + r + "}");
    }
  }

  var logo = "[" + width + ", " + height + ", [" + coords.join(",") + "]]";

  fs.writeFile('output.txt', logo, function (err) {
    if (err) throw err;
  });
});
