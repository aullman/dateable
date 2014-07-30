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
          'bower_components/jquery/jquery.js',
          'bower_components/bootstrap/dist/bootstrap.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'app/client/javascripts/controllers/index-controller.js',
          'app/client/javascripts/controllers/events/event-controller.js',
          'app/client/javascripts/controllers/events/index-controller.js',
          'app/client/javascripts/controllers/events/dates/date-controller.js',
          'app/client/javascripts/controllers/events/dates/index-controller.js',
          'app/client/javascripts/controllers/controllers.js',
          'app/client/javascripts/filters/partition-filter.js',
          'app/client/javascripts/filters/filters.js',
          'app/client/javascripts/client.js'
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