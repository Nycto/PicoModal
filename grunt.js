/*global module:false*/
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-string-replace');

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        lint: {
            files: ['grunt.js', 'lib/**/*.js']
        },
        concat: {
            dist: {
                src: ['<file_strip_banner:lib/picoModal.js>'],
                dest: 'dist/picoModal.concat.js'
            }
        },
        "string-replace": {
            dist: {
                src: [ '<config:concat.dist.dest>' ],
                dest: 'dist/picoModal.replaced.js',
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
        min: {
            dist: {
                src: ['<config:string-replace.dist.dest>'],
                dest: 'dist/picoModal.min.js'
            }
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint'
        },
        jshint: {},
        uglify: {}
    });

    // Default task.
    grunt.registerTask('default', 'lint concat string-replace min');

};
