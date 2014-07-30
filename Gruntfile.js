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
          'javascripts/client.js'
        ],
        dest: 'public/javascripts/client.js'
      }
    },
    uglify: {
      javascripts: {
        files: {
          'public/client.js': 'public/client.js'
        }
      }
    },
    cssmin: {
      stylesheets: {
        files: {
          'public/client.css': 'public/client.css'
        }
      }
    },
    less: {
      compile: {
        options: {
          paths: ["bower_components/bootstrap/less"]
        },
        files: {
          "public/stylesheets/client.css": "app/stylesheets/client.less"
        }
      }
    }
  });

  // Load the plugins that provides the tasks we use.
  require('load-grunt-tasks')(grunt);

  // Define task(s).
  grunt.registerTask('build', ['clean', 'copy', 'concat', 'less']);
  grunt.registerTask('minify', ['cssmin', 'uglify']);

  grunt.registerTask('deploy', ['build', 'less', 'minify']);
  grunt.registerTask('default', 'build');
};