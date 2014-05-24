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

        "string-replace": {
            build: {
                src: [ 'src/picoModal.js' ],
                dest: 'build/picoModal.replaced.js',
                options: {
                    replacements: [
                        { pattern: /\bwatch\b/g, replacement: "w" },
                        { pattern: /\btrigger\b/g, replacement: "t" },
                        { pattern: /\belem\b/g, replacement: "e" },
                        { pattern: /\bchild\b/g, replacement: "c" },
                        { pattern: /\bstylize\b/g, replacement: "s" },
                        { pattern: /\bclazz\b/g, replacement: "z" },
                        { pattern: /\bhtml\b/g, replacement: "h" },
                        { pattern: /\bgetWidth\b/g, replacement: "d" },
                        { pattern: /\bonClick\b/g, replacement: "o" },
                        { pattern: /\bdestroy\b/g, replacement: "x" }
                    ]
                }
            }
        },

        uglify: {
            build: {
                src: 'build/picoModal.replaced.js',
                dest: 'build/picoModal-<%= pkg.version %>.min.js'
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.'
                }
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'string-replace', 'uglify']);

    grunt.registerTask('dev', ['default', 'connect', 'watch']);
};
