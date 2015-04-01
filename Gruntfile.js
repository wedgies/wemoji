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
        files: ['package.json','bower.json'],
        commitFiles: ['package.json','bower.json'],
        pushTo: 'origin'
      }
    }
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('build', 'execute:build');
  grunt.registerTask('default', 'build');

};
