/*jslint white:false */
/*global require, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window), C = (W.C || W.console || {});

W.SHIET = {};
W.debug = Number(new Date('2015/11/01') > new Date());

require.config({
    baseUrl: 'scripts',
    paths: {
        lr: 'http://localhost:7325/livereload.js?snipver=1',
        jquery: '../vendor/jquery',
        lodash: '../vendor/lodash',
        modern: '../vendor/modernizr',
        //
        beacon: 'libs/ecg-beacon',
        console: 'libs/console',
        modal: 'libs/modal',
        stats: 'libs/ecg-stats',
        //
    },
});

require(['modern', 'console'], function () {
    try {
        W.SHIET.init();

        if (W.SHIET.trident) { // debug IE less
            W.debug--;
        }
        if (W.location.hostname === 'localhost') { // debug local more
            if (W.debug > 0) {
                $('html').addClass('debug');
            }
            W.debug++;
        }
        if (W.debug > 0) { // any debug should attempt livereload
            require(['lr']);
            C.warn('LiveReloading');
        }
    } catch (err) {
        C.error('config', err);
    }

    /// CUSTOM
    require(['lodash', '_main'], function (_) {

        _.delay(function () {
            if (W.debug < 2) {
                require(['stats'], function (stats) {
                    stats.init('JUMBLE');
                });
            }
        }, 1e3);
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */