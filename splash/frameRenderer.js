var pathdrawer = function(opts, callback) {
  this.frames = ctx.frames;
  this.canvas = opts.ctx.canvas;
  this.screen = opts.ctx.screen;
  this.box = opts.ctx.box;
  this.interval = opts.interval || 20;
  this.callback = opts.callback;

  var draw = function() {
    this.canvas.clear();
    if (this.frames.hasNext()) {
      this.frames.next();
      this.box.setText(this.canvas.frame());
      this.screen.render();
    } else {
      if(this.callback != undefined) {
        this.callback();
      }

      clearInterval(this.timer);
    }
  };

  this.start = function() {
    this.timer = setInterval(draw.bind(this), this.interval);
  }
}

module.exports = pathdrawer;
