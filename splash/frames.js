module.exports = function() {
  this.frames = [];

  this.next = function() {
    return frames.pop()();
  }

  this.hasNext = function() {
    return frames.length > 0;
  }
}
