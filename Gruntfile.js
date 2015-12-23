/* global module: false, require: false, process: false */

// Browsers to test on saucelabs
var browsers = [
    {
        browserName: 'firefox',
        platform: 'WIN8.1'
    },
    {
        browserName: 'chrome',
        platform: 'windows 8.1'
    },
    {
        browserName: 'internet explorer',
        version: '11',
        platform: 'WIN8.1'
    },
    {
        browserName: 'internet explorer',
        version: '10',
        platform: 'WIN8'
    },
    {
        browserName: 'internet explorer',
        version: '9',
        platform: 'WIN7'
    },
    {
        browserName: 'android',
        platform: 'Linux',
        version: '4.4',
        deviceName: 'Google Nexus 7 HD Emulator'
    }
];

// URLs to test on saucelabs
var urls = [
    'http://localhost:8080/?createFromString',
    'http://localhost:8080/?createFromNode',
    'http://localhost:8080/?specificWidth',
    'http://localhost:8080/?withoutClose',
    'http://localhost:8080/?customStyles',
    'http://localhost:8080/?customClasses',
    'http://localhost:8080/?prebuilt',
    'http://localhost:8080/?alternateParent'
];

module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'task/**/*.js'],
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                nonew: true,
                noempty: true,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                maxlen: 80,
                browser: true,
                globals: {
                    "define": true,
                    "module": true
                }
            }
        },

        uglify: {
            build: {
                src: 'src/picoModal.js',
                dest: 'build/picoModal-<%= pkg.version %>.min.js'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'uglify']
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.'
                }
            }
        },

        bowerVerify: {
            build: {}
        }
    });

    grunt.registerTask(
        'saucelabs-run',
        require('./task/screenshots.js')(grunt, {
            name: 'PicoModal',
            build: process.env.CI_BUILD_NUMBER || Date.now(),
            urls: urls,
            browsers: browsers
        })
    );

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-verify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'bowerVerify']);

    grunt.registerTask('dev', ['jshint', 'uglify', 'connect', 'watch']);

    grunt.registerTask('sauce', ['jshint', 'connect', 'saucelabs-run']);
};

