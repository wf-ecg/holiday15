/*jslint white:false */
/*global require, window, _ */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = (W && W.window || window),
    C = (W.C || W.console || {});

W.SHIET = {};
W.debug = Number(new Date('2015/12/01') > new Date());

require.config({
    baseUrl: '../jj-scripts',
    paths: {
        lr: 'http://localhost:7325/livereload.js?snipver=1',
        jquery: '/lib/jquery/1.11.3/jquery',
        jqmobi: '/lib/jquery/mobile/custom/jquery.mobile',
        lodash: '/lib/underscore/js-1.4.4/lodash.underscore',
        modern: '/lib/modernizr/2.6.2/modernizr',
        // vendor
        boots: '../vendor/bootstrap/js/bootstrap.min',
        // custom
        data: '../libs/anagrams',
        console: '../libs/ecg/console',
        dialog: '../libs/ecg/dialog',
        modal: '../libs/ecg/modal',
        utils: '../libs/ecg/utils',
        beacon: '../libs/ecg/beacon',
        stats: '../libs/ecg/stats',
        jqxtn: '../libs/jq-xtn',
        xtn: '../libs/drt-xtn',
        //
        main: '../jumbles/_main',
        share: '../jumbles/share',
    },
});

require(['modern', 'console', 'lodash', 'utils'], function () {
    var html = $('html');
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
    var gaToke = '';

    if (location.href.match('irt')) {
        gaToke = 'HOLI-IRT';
        html.addClass('IRT');
    } else {
        gaToke = 'HOLI-JING';
        html.addClass('ENT');
    }

    require(['boots', 'jqmobi', 'jqxtn', 'main'], function () {

        _.delay(function () {
            if (W.debug < 2) {
                require(['stats'], function (stats) {
                    stats.init(gaToke);
                });
            }
        }, 1e3);
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
