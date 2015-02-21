// Default folder locations
var assets   = 'src/main/';
var compiled = 'src/dist/';
var test     = 'src/test/';

// Node modules

module.exports = {
    scripts : {
        node_modules : {
            jquery : 'node_modules/jquery/dist/jquery.js'
        },
        lib : {
            exampleLib : assets + 'lib/exampleLib/exampleLib.js'
        },
        src : {
            app : assets + 'js/**/*.js',
            test : {
                spec : test + 'spec/**/*-spec.js',
                helpers : test + 'helpers/**/*.js'
            }
        },
        dest : {
            app : compiled + 'js/',
            testRunner : test + 'runner/'
        }
    },
    styles : {
        node_modules : {
            jasmine : 'node_modules/jasmine-core/lib/jasmine.css'
        },
        lib : {

        },
        src : {
            app : assets + 'sass/main.scss'
        },
        dest : {
            app : compiled + 'css/',
            test : test + 'jasmine-core'
        }
    },
    images : {
        src : {
            img : assets + 'img/**/*',
            sassImg : assets + 'sass/img/**/*'
        },
        dest : {
            img : compiled + 'img/',
            cssImg : compiled + 'css/img/'
        }
    },
    maps : compiled + 'maps/',
    karma : [
        'node_modules/jquery/dist/jquery.js',
        assets + 'lib/exampleLib/exampleLib.js',
        assets + 'js/**/*.js',
        test + 'spec/**/*-spec.js'
    ]



};