module.exports=function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'concat': {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/myown.js'],
        dest: 'dist/myown.min.js',
      },
    },
    'babel': {
      options: {
        sourceMap: true,
        presets: ['es2015'],
      },
      dist: {
        files: {
          'js/myown.js': 'js/my-exp.js',
        },
      },
    },
    'uglify': {
      my_target: {
        files: {
          'dist/myown.js': ['js/myown.js'],
        },
      },
    },
    'jshint': {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        globals:
        {
          jQuery: true,
          console: true,
          module: true,
          document: true,
        },
      },
    },
    'htmlmin': {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          'dist/index.html': 'index.html',
        },
      },
    },
    'htmllint': {
      all: ['index.html'],
    },
    'csslint': {
      src: ['css/main.css'],
    },
    'imageoptim': {
      myTask: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true,
        },
        src: ['images'],
      },
    },
    'cssmin': {
      target: {
        files: [
          {
            src: 'css/main.css',
            dest: 'dist/main.css',
          },
        ],
      },
    },
    'concat_css': {
      options: {

      },
      all: {
        src: ['css/*.css'],
        dest: 'dist/main.css',
      },
    },
    'postcss': {
      options: {
        map: true,
        processors: [
            require('autoprefixer')([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 3',
            'Explorer 9',
            'iOS >= 6',
            'Opera >= 8',
            'Safari >= 6',
          ]),
        ],
      },
      dist: {
        src: 'css/main.css',
      },
    },
    'watch': {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
      },
    },
    'sass': {
      dev: {
        files: {
          'css/main.css': 'sass/main.scss',
        },
      },
    },
    'browserSync': {
      dev: {
        bsFiles: {
          src: [
          'css/*.css',
          'index.html'],
        },
        options: {
          watchTask: true,
          server: './',
        },
      },
    },
    'stylelint': {
      simple: {
        options: {
          configFile: './.stylelintrc.json',
          format: 'sass',
        },
        src: 'sass/**/*.scss',
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.registerTask('default', ['babel', 'browserSync', 'watch']);
  grunt.registerTask('ondev', ['postcss', 'cssmin', 'htmlmin', 'uglify']);
};
