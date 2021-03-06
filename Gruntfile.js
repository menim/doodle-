module.exports=function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'concat': {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/tiny-slider.js','js/Swipe.js','js/slider.js','js/smooth-scroll.polyfills.js','js/intersection-observer.js','js/myown.js'],
        dest: 'dist/js/myown.js',
      },
    },
    'babel': {
      options: {
        sourceMap: true,
        plugins: ['transform-object-assign'],
        presets: ['es2015'],
      },
      dist: {
        files: {
          'dist/js/myown.js': 'dist/js/myown.js',
        },
      },
    },
    'uglify': {
      my_target: {
        files: {
          'dist/js/myown.js': ['dist/js/myown.js'],
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
            src: 'dist/css/main.css',
            dest: 'dist/css/main.css',
          },
        ],
      },
    },
    'concat_css': {
      options: {

      },
      all: {
        src: ['css/*.css'],
        dest: 'dist/css/main.css',
      },
    },
    'postcss': {
      options: {
        map: true,
        processors: [
            require('autoprefixer')(['last 5 versions']),
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
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('onprod', ['postcss', 'concat', 'concat_css', 'cssmin', 'htmlmin', 'uglify', 'babel']);
};
