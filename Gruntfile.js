/* global module: false, process: false */

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
        version: '4.3',
        deviceName: 'Android Emulator'
    },
    {
        browserName: 'android',
        platform: 'Linux',
        version: '4.4',
        deviceName: 'Google Nexus 7 HD Emulator'
    },
    {
        browserName: 'android',
        platform: 'Linux',
        version: '5.0',
        deviceName: 'Android Emulator'
    },
    {
        browserName: 'android',
        platform: 'Linux',
        version: '5.1',
        deviceName: 'Android Emulator'
    },
    {
        browserName: 'Safari',
        appiumVersion: '1.4.16',
        deviceName: 'iPhone 6',
        deviceOrientation: 'portrait',
        platformVersion: '9.2',
        platformName: 'iOS'
    }
];

module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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
            tasks: ['default']
        },

        bowerVerify: {
            build: {}
        },

        domTest: {
            files: [ "test/*.js" ]
        },

        'saucelabs-custom': {
            all: {
                options: {
                    urls: [ 'http://localhost:8080' ],
                    build: process.env.CI_BUILD_NUMBER || Date.now(),
                    testname: 'PicoModal unit tests',
                    public: "public",
                    pollInterval: 5000,
                    statusCheckAttempts: 48,
                    'max-duration': 90,
                    maxRetries: 1,
                    browsers: browsers
                }
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-verify');
    grunt.loadNpmTasks('grunt-dom-test');
    grunt.loadNpmTasks('grunt-continue');
    grunt.loadNpmTasks('grunt-saucelabs');

    // Default task(s).
    grunt.registerTask(
        'default',
        ['jshint', 'uglify', 'domTest:test']);

    grunt.registerTask( 'dev', [
        'domTest:server', 'continue:on',
        'jshint', 'uglify', 'domTest:test',
        'watch']);

    grunt.registerTask(
        'sauce',
        ['default', 'domTest:server', 'saucelabs-custom']);
};

