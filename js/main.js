requirejs.config({
    baseUrl: "js/",
    paths: {
        /* External libs */
        Stats: "../libs/Stats/Stats",
        jquery: "../libs/jquery/jquery.min",
        underscore: "../libs/underscore/underscore",
        howl: "../libs/howler/howler.min",
        "requirejs-domready": "../libs/requirejs-domready/domReady"
    },
    shim: {
        jquery: {
            exports: "$"
        },
        underscore: {
            exports: "_"
        },
        Stats: {
            exports: "Stats"
        },
        howl: {
            exports: "Howler",
            init: function () {
                return {
                    Howl: Howl,
                    Howler: Howler
                };
            }
        }
    },
    // This is to avoid caching during development by appending the current date to script urls
    urlArgs: "d=" + Date.now()
});

require (["requirejs-domready"], function (domready) {

});