module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    execute: {
      build: {
        src: [ 'build.js' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-execute');

  grunt.registerTask('build', 'execute:build');
  grunt.registerTask('default', 'build');

};
