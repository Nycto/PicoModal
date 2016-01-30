/* global module: false, process: false */

// Browsers to test on saucelabs
var browsers = {
    firefox: [
        {
            browserName: 'firefox',
            platform: 'WIN8.1'
        }
    ],
    chrome: [
        {
            browserName: 'chrome',
            platform: 'windows 8.1'
        }
    ],
    ie:[
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
        }
    ],
    android: [
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
        }
    ],
    ios: [
        {
            browserName: 'iphone',
            platform: 'OS X 10.10',
            version: '9.2',
            deviceName: 'iPhone Simulator'
        },
        {
            browserName: 'iphone',
            platform: 'OS X 10.10',
            version: '8.4',
            deviceName: 'iPhone Simulator'
        }
    ],
    safari: [
        {
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '9.0'
        }
    ]
};

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

        // Register saucelabs configuration for each browser group. This allows
        // them to be run individually instead of all or nothing
        'saucelabs-custom': Object.keys(browsers).reduce(
            function (conf, key) {
                var clone = Object.create(conf.all.options);
                clone.browsers = browsers[key];
                conf[key] = { options: clone };
                return conf;
            },
            {
                all: {
                    options: {
                        urls: [ 'http://localhost:8080' ],
                        build: process.env.CI_BUILD_NUMBER || Date.now(),
                        testname: 'PicoModal unit tests',
                        public: "public",
                        pollInterval: 5000,
                        statusCheckAttempts: 48,
                        'max-duration': 180,
                        maxRetries: 1,
                        browsers: Object.keys(browsers)
                            .map(function (key) { return browsers[key]; })
                            .reduce(function (a, b) { return a.concat(b); }, [])
                    }
                }
            }
        )
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
        ['default', 'domTest:server', 'saucelabs-custom:all']);

    // Register a grunt target for testing individual browser groups
    Object.keys(browsers).forEach(function (browser) {
        grunt.registerTask(
            browser,
            ['default', 'domTest:server', 'saucelabs-custom:' + browser]);
    });

    // Pull requests don't have access to saucelabs, so we need
    // to disable that
    grunt.registerTask('travis', [
        process.env.TRAVIS_PULL_REQUEST === "false" ?
        'sauce' :
        'default'
    ]);
};

