module.exports = function(){
  var cucumberStep = this;
  var path = require('path');
  var cukedZombie = require('cuked-zombie');

  var infected = cukedZombie.infect(cucumberStep, {
    world: require('../world-config'),
    steps: {
      dir: __dirname
    }
  });
};