module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    execute: {
      build: {
        src: [ 'build.js' ]
      }
    },
    bump: {
      options: {
        commitFiles: ['package.json','bower.json'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('build', 'execute:build');
  grunt.registerTask('default', 'build');

};
