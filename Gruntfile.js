/* global module: false */
module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
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
                browser: true
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

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-verify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'bowerVerify']);

    grunt.registerTask('dev', ['jshint', 'uglify', 'connect', 'watch']);
};
