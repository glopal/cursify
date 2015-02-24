// TODO: extract connector from this module

var pathdrawer = function(opts, callback) {
  this.staticPixels = [];
  this.currentPixel;
  this.paths = opts.connector(opts.startCoords,opts.endCoords);
  this.canvas = opts.ctx.canvas;
  this.screen = opts.ctx.screen;
  this.box = opts.ctx.box;
  this.interval = opts.interval || 20;
  this.callback = opts.callback;
  this.finishedPaths = 0;

  var draw = function() {
    this.canvas.clear();
    if (this.finishedPaths != this.paths.length) {
      for(var i = 0; i < this.paths.length; i++) {
        if(this.paths[i].length != 0) {
          if(this.paths[i].length == 1) {
            this.staticPixels.push(this.paths[i].pop());
            this.finishedPaths++;
          } else {
            this.currentPixel = this.paths[i].pop();
            if(this.currentPixel['x'] != undefined)
              this.canvas.set(this.currentPixel['x'], this.currentPixel['y']);
          }
        }
      }


      for(var i = 0; i < this.staticPixels.length; i++) {
        this.currentPixel = this.staticPixels[i];
        this.canvas.set(this.currentPixel['x'], this.currentPixel['y']);
      }

      this.box.setText(this.canvas.frame());

      this.screen.render();
    } else {
      if(this.callback != undefined) { this.callback(); }

      clearInterval(this.timer);
    }
  };

  this.start = function() {
    this.timer = setInterval(draw.bind(this), this.interval);
  }
}

module.exports = pathdrawer;
