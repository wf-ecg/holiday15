/*jslint white:false */
/*global require, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W.SHIET = {};
W.debug = Number(new Date('2015/12/01') > new Date());

require.config({
    baseUrl: '.',
    paths: {
        lr: 'http://localhost:7325/livereload.js?snipver=1',
        jquery: '/lib/jquery/1.11.3/jquery',
        jqmobi: '/lib/jquery/mobile/custom/jquery.mobile',
        lodash: '/lib/underscore/js-1.4.4/lodash.underscore',
        modern: '/lib/modernizr/2.6.2/modernizr',
        // ecg
        beacon: '../libs/ecg/beacon',
        console: '../libs/ecg/console',
        dialog: '../libs/ecg/dialog',
        modal: '../libs/ecg/modal',
        stats: '../libs/ecg/stats',
        utils: '../libs/ecg/utils',
        // vendor
        angular: '../vendor/ng/angular.min',
        angularAMD: '../vendor/ng/angularAMD.min',
        angularRT: '../vendor/ng/angular-route.min',
        boots: '../vendor/bootstrap/js/bootstrap.min',
        // custom
    },
    shim: { angularAMD: ['angular'], angularRT: ['angular'] },
});

require(['modern', 'console', 'lodash', 'utils'], function () {
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
    require(['boots', 'jqmobi', '_main'], function () {

        _.delay(function () {
            if (W.debug < 2) {
                require(['stats'], function (stats) {
                    stats.init('HOLI-LAND');
                });
            }
        }, 1e3);
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
