module.exports = function (grunt) {

    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-npm2bower-sync');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    var jsSrc = [
        'src/js/element.js',
        'src/js/component.js',
        'src/js/micromvc.js'
    ]
    var srcHintOptions = grunt.file.readJSON("src/js/.jshintrc");


    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        //concat: {
        //    options: {
        //        separator: '\n\n'
        //    },
        //    dist: {
        //        src: jsSrc,
        //        dest: 'dist/js/micromvc.js'
        //    }
        //},
        //uglify: {
        //    options: {
        //        preserveComments: false,
        //        sourceMap: true,
        //        sourceMapName: "dist/js/micromvc.min.map",
        //        report: "min",
        //        beautify: {
        //            "ascii_only": true
        //        },
        //        banner: "/*! MicroMVC Framework v<%= pkg.version %> | " +
        //        "(c) Marc Galoyer | MIT */",
        //        compress: {
        //            "hoist_funs": false,
        //            loops: false,
        //            unused: false
        //        }
        //    },
        //    dist: {
        //        src: jsSrc,
        //        dest: 'dist/js/micromvc.min.js'
        //    }
        //},
        watch: {
            scripts: {
                files: 'src/js/*.js',
                tasks: ['dev']
            },
            test: {
                files: ['tests/spec/*.js'],
                tasks: ['dev']
            }
        },
        jshint: {
            dev: {
                src: ["src/js/*.js"],
                options: {
                    jshintrc: true
                }
            },
            dist: {
                src: "dist/js/micromvc.js",
                options: srcHintOptions
            }
        },
        sync: {
            all: {
                options: {

                    sync: [
                        'name',
                        'main',
                        'description',
                        'version',
                        'homepage',
                        'keywords',
                        'license'
                    ]
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    mainConfigFile: "build/build.js",
                    optimize: "uglify2",
                    "out": "dist/js/micromvc.min.js"
                }
            },
            dev: {
                options: {
                    mainConfigFile: "build/build.js",
                    optimize: "none",
                    "out": "dist/js/micromvc.js"
                }
            }
        },

        jasmine: {
            framework: {
                options: {
                    specs: 'tests/spec/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'tests/config.js'
                    }
                }
            }
        }

    })


    //grunt.registerTask('dev', ['concat:dist']);
    grunt.registerTask('dev', ['jasmine', 'requirejs:dev']);
    grunt.registerTask('dist', ['dev', 'sync', 'requirejs:dist']);

    grunt.registerTask('default', ['dev', 'watch']);
}