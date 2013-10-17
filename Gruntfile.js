(function (){
    "use strict";

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            jshint: {
                dependencies: ['Gruntfile.js'],
                src: ["src/**/*.js"],
                test: ["tests/**/*.js"],
                options: {
                    jshintrc: ".jshintrc"
                }
            },
            jasmine: {
                pivotal: {
                    src: "src/**/*.js",
                    options: {
                        specs: "tests/specs/**/*_spec.js",
                        verbose: true
                    }
                }
            },
        });

        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-contrib-jshint');

        grunt.registerTask('test', ['jasmine', 'jshint']);

        grunt.registerTask('default', 'Log some stuff.', function() {
            grunt.log.write('Logging some stuff...').ok();
        });
    };
}());