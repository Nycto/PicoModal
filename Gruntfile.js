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
    'http://localhost:8080/',
    'http://localhost:9090/?specificWidth',
    'http://localhost:9090/?withoutClose',
    'http://localhost:9090/?customStyles',
    'http://localhost:9090/?customClasses',
    'http://localhost:9090/?prebuilt',
    'http://localhost:9090/?alternateParent',
    'http://localhost:9090/?keyboard',
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
            files: ['src/**/*.js', 'test/**/*.js'],
            tasks: ['jshint', 'uglify', 'domTest:test']
        },

        connect: {
            server: {
                options: {
                    port: 9090,
                    base: '.'
                }
            }
        },

        bowerVerify: {
            build: {}
        },

        domTest: {
            files: [ "test/*.js" ]
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
    grunt.loadNpmTasks('grunt-dom-test');
    grunt.loadNpmTasks('grunt-continue');

    // Default task(s).
    grunt.registerTask(
        'default',
        ['jshint', 'uglify', 'domTest:test']);

    grunt.registerTask( 'dev', [
        'domTest:server', 'continue:on',
        'jshint', 'uglify', 'domTest:test',
        'watch'
        ]);

    grunt.registerTask(
        'sauce',
        ['default', 'connect', 'domTest:server', 'saucelabs-run']);
};

