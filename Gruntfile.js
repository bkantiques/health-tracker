module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
            // Concats local css into one file to reduce requests
            css: {
                src: ['src/bower_components/normalize-css/normalize.css','src/bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css', 'src/css/style.css'],
                dest: 'gruntwork/css/concat/style.css'
            },
            // Concats local js bower files into one file to reduce requests
            libs: {
                src: ['src/bower_components/fetch/fetch.js',
                'src/bower_components/jquery/dist/jquery.min.js',
                'src/bower_components/underscore/underscore-min.js',
                'src/bower_components/backbone/backbone-min.js',
                'src/bower_components/jquery-ui/jquery-ui.min.js',
                'src/bower_components/Chart.js/dist/Chart.min.js'],
                dest: 'gruntwork/js/concat/libs.js'
            },
            // Concats local js app files into one file to reduce requests
            js: {
                src: ['src/js/models/user.js',
                'src/js/models/searchItem.js',
                'src/js/models/foodRecord.js',
                'src/js/views/login.js',
                'src/js/views/register.js',
                'src/js/views/main.js',
                'src/js/views/search.js',
                'src/js/views/searchItem.js',
                'src/js/views/recordItem.js',
                'src/js/views/record.js',
                'src/js/views/stats.js',
                'src/js/collections/searchItems.js',
                'src/js/collections/foodRecords.js',
                'src/js/routers/router.js',
                'src/js/app.js'],
                dest: 'gruntwork/js/concat/app.js'
            }
        },

        // Adds css prefixes
        autoprefixer: {
            dist: {
                files: {
                    'src/css/style.css': 'gruntwork/css/sassed/style.css'
                }
            }
        },

        uglify: {
            // Minifies concatenated js and puts in dist folder
            build: {
                files: {
                    'dist/js/libs.min.js': 'gruntwork/js/concat/libs.js',
                    'dist/js/app.min.js': 'gruntwork/js/concat/app.js'
                }
            }
        },

        cssmin: {
            // Minifies concatenated css and puts in dist folder
            build: {
                files: {
                    'dist/css/style.min.css': 'gruntwork/css/concat/style.css'
                }
            }
        },

        sass: {
            src: {
                files: {
                    'gruntwork/css/sassed/style.css': 'src/css/sass/style.scss'
                }
            }
        },

        processhtml: {
            build: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },

        watch: {
            dist: {
                files: ['src/css/*.scss','src/index.html', 'src/js/*.js'],
                tasks: ['build']
            },
            css: {
                files: ['src/css/sass/*.scss'],
                tasks: ['sass', 'autoprefixer']
            }
        },

        browserSync: {
            bsFiles: {
                src: [
                    'src/index.html',
                    'src/css/style.css',
                    'src/js/**/*.js'
                ]
            },
            options: {
                server: {
                    baseDir: './src/'
                },
                watchTask: true
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    // 4. Register tasks
    grunt.registerTask('build', ['sass', 'autoprefixer', 'concat', 'cssmin', 'uglify', 'processhtml']);
    grunt.registerTask('watchSync', ['browserSync', 'watch']);

};