module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    typescript: {
      dev: {
        src:['src/**/*.ts'],
        dest: 'dist/js/index.js',
        options: {
          target: 'es5',
          sourcemap: true
        }
      },
      server: {
        src:['server/**/*.ts'],
        dest: 'server.js',
        options: {
          target: 'es5'
        }
      },
      ui: {
        src:['webapp/**/*.ts'],
        dest: 'dist/js/app.js',
        options: {
          target: 'es5',
          sourcemap: true
        }
      }
    },
    bower_concat: {
        all: {
            dest: 'dist/js/resources.js',
            cssDest: 'dist/css/resources.css',
            bowerOptions: false
        }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['dist/js/index.js', 'server/app.js'],
        dest: 'server.js',
      },
    },
  });

  // Default task(s).
  grunt.registerTask('default', [
    'bower_concat:all',
    'typescript:dev',
    'typescript:server',
    'typescript:ui',
    "concat"
  ]);
};
