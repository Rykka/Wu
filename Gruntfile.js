module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            less: {
                files: ['static/less/*.less'],
                tasks: ['less']
            }
        },
        less: {
            dist: {
                files: {
                    "static/css/theme.gray.css": "static/less/theme.gray.less",
                    "static/css/theme.green.css": "static/less/theme.green.less",
                    "static/css/theme.blue.css": "static/less/theme.blue.less",
                    "static/css/theme.red.css": "static/less/theme.red.less"
                }
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['less']);
};
