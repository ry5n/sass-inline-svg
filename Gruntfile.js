'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    sass: {
      options: {
        sourcemap: 'none',
        style: 'expanded',
        require: './sass-inline-svg.rb'
      },

      visual_test: {
        src: ['test/fixtures/index.scss'],
        dest: 'tmp/index.css'
      },

      no_fill: {
        src: ['test/fixtures/no-fill.scss'],
        dest: 'tmp/no-fill.css'
      },

      add_fill: {
        src: ['test/fixtures/add-fill.scss'],
        dest: 'tmp/add-fill.css'
      },

      with_fill: {
        src: ['test/fixtures/with-fill.scss'],
        dest: 'tmp/with-fill.css'
      },

      replace_fill: {
        src: ['test/fixtures/replace-fill.scss'],
        dest: 'tmp/replace-fill.css'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sass', 'nodeunit']);

  // By default, compile and run all tests.
  grunt.registerTask('default', ['test']);
};
