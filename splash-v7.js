var Canvas = require('drawille');
var blessed = require('blessed');
var _ = require("underscore");
var logos = require("./splash/logos.js");
var PathDrawer = require("./splash/pathdrawer.js");
var coords = require("./splash/coords.js");
var smoothpaths = require('./splash/smoothpaths-v2.js');
var Watercolor = require('watercolor'),
    watercolor = Watercolor({
        style : 'normal',
        color : 'green'
    });

var smallLogo = logos.small;
var largeLogo = logos.large;
var canvas = new Canvas(160, 68);
var screen = blessed.screen();

screen.title = 'Cursify';

var box = blessed.box({
  width: '100%',
  height: '100%',
  style: {
  fg: 'green'
  }
});

var loginBox = blessed.box({
  top: 15,
  left: 'center',
  hide: true,
  width: 35,
  height: 8,
  border: {
    type: 'line'
  },
});

var lblUsername = blessed.text({
  parent: loginBox,
  height: 'shrink',
  width: 'shrink',
  top: 2,
  left: 2,
  content: 'Username:'
});
var txtUsername = blessed.textbox({
  parent: loginBox,
  inputOnFocus: true,
  input: true,
  height: 1,
  width: 20,
  top: 2,
  left: 13,
  content: 'sdfasdf',
  style: {
    fg: 'white',
    bg: 'black'
  }
});
var lblPassword = blessed.text({
  parent: loginBox,
  height: 'shrink',
  width: 'shrink',
  top: 4,
  left: 2,
  content: 'Password:'
});
var txtPassword = blessed.textbox({
  parent: loginBox,
  inputOnFocus: true,
  input: true,
  height: 1,
  width: 20,
  top: 4,
  left: 13,
  content: 'sdfasdf',
  style: {
    fg: 'white',
    bg: 'black'
  }
});
var btnLogin = blessed.button({
  parent: loginBox,
  height: 'shrink',
  width: 'shrink',
  top: 6,
  left: 'center',
  content: '{bold}LOGIN{/bold}',
  tags: true,
  style: {
    bg:'blue'
  }
});

screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var ctx = {
  canvas: canvas,
  screen: screen,
  box: box };

var small = new PathDrawer({
  startCoords: coords.offset(0,20,_.shuffle(largeLogo.coords)),
  endCoords: coords.offset(109,0,smallLogo.coords),
  connector: smoothpaths.bind({equalize:true}),
  interval: 1,
  ctx: ctx
});

var large = new PathDrawer({
  startCoords: coords.rpoints.edge(159,67,largeLogo.coords.length),
  endCoords: coords.offset(0,20,largeLogo.coords),
  connector: smoothpaths.bind({equalize:true,emptyFill:true}),
  interval: 5,
  ctx: ctx,
  callback:function(){
    setTimeout(function() {
      screen.append(loginBox);
      screen.render();
      setTimeout(function(){screen.remove(loginBox);small.start()}.bind(small),2000);
    },500);
  }
});

large.start();
