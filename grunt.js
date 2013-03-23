/*global module:false*/
module.exports = function(grunt) {

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
        min: {
            dist: {
                src: ['<config:concat.dist.dest>'],
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
    grunt.registerTask('default', 'lint concat min');

};
