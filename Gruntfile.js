module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-requirejs')
    grunt.loadNpmTasks('grunt-npm2bower-sync')


    var jsSrc = [
        'src/js/element.js',
        'src/js/component.js',
        'src/js/micromvc.js'
    ]
    var srcHintOptions = grunt.file.readJSON( "src/js/.jshintrc" );


    grunt.initConfig({
        pkg: grunt.file.readJSON( "package.json" ),
        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: jsSrc,
                dest: 'dist/js/micromvc.js'
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                sourceMap: true,
                sourceMapName: "dist/js/micromvc.min.map",
                report: "min",
                beautify: {
                    "ascii_only": true
                },
                banner: "/*! MicroMVC Framework v<%= pkg.version %> | " +
                "(c) Marc Galoyer | MIT */",
                compress: {
                    "hoist_funs": false,
                    loops: false,
                    unused: false
                }
            },
            dist: {
                src: jsSrc,
                dest: 'dist/js/micromvc.min.js'
            }
        },
        watch: {
            scripts: {
                files: 'src/js/*.js',
                //tasks: ['concat:dist']
                tasks: ['requirejs:dev']
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
                    baseUrl: "src/js",
                    //mainConfigFile: "path/to/config.js",
                    name: "micromvc",
                    out: "dist/js/micromvc.min.js",
                    optimize: "uglify2"
                }
            },
            dev: {
                options: {
                    baseUrl: "src/js",
                    //mainConfigFile: "path/to/config.js",
                    name: "micromvc",
                    out: "dist/js/micromvc.js",
                    optimize: "none"
                }
            }
        }


    })



    //grunt.registerTask('dev', ['concat:dist'])
    grunt.registerTask('dev', ['requirejs:dev'])
    grunt.registerTask('dist', ['sync', 'requirejs:dist']) //, 'uglify:dist'

    grunt.registerTask('default', ['dev', 'watch'])
}