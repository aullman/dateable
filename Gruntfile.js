module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public'],
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap/fonts', src: ['*'], dest: 'public/fonts/', filter: 'isFile'}
        ]
      }
    },
    concat: {
      javascripts: {
        src: [
          'bower_components/lodash/dist/lodash.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'app/client/javascripts/**'
        ],
        dest: 'public/javascripts/client.js'
      }
    },
    uglify: {
      javascripts: {
        files: {
          'public/javascripts/client.js': 'public/javascripts/client.js'
        }
      }
    },
    cssmin: {
      stylesheets: {
        files: {
          'public/stylesheets/client.css': 'public/stylesheets/client.css'
        }
      }
    },
    less: {
      compile: {
        options: {
          paths: ["bower_components/bootstrap/less"]
        },
        files: {
          "public/stylesheets/client.css": "app/client/stylesheets/client.less"
        }
      }
    }
  });

  // Load the plugins that provides the tasks we use.
  require('load-grunt-tasks')(grunt);

  // Define task(s).
  grunt.registerTask('build', ['clean', 'copy', 'concat', 'less']);
  grunt.registerTask('minify', ['cssmin']);

  grunt.registerTask('deploy', ['build', 'minify']);
  grunt.registerTask('default', 'build');
};