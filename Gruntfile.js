module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('cuked-zombie');

  grunt.initConfig({
    'cuked-zombie': {
      options: {
        features: 'features',
        bootstrap: 'tests/js/cucumber/bootstrap.js',
        format: 'pretty'
      }
    }
  });

};