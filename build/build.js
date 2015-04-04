requirejs.config({
    "baseUrl": "../src/js",
    "paths": {
        "vendor": "../../bower_components"
    },
    name: "../../bower_components/almond/almond",
    "include": ["micromvc"],
    "wrap": {
        "startFile": "../build/wrap.start",
        "endFile": "../build/wrap.end"
    }
})