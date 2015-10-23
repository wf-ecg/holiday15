/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery'], function
    MAIN($) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 0;
    var PC = !W.navigator.userAgent.match(/mobi/i);

//EXTEND
    Main.mobile = !PC;

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

//  PRIVATE
    function watchInputDevice() {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mousemove', function () {
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    }
    function doBindings() {
        watchInputDevice();
    }
    function expose() {
        W.main = Main; // expose for dev
        $.extend(Main, {
//            Modal: Modal,
//            Jumble: Jumble,
//            Tile: Tile,
//            Timer: Timer,
        });
    }
    function runTests() {
        // require(['jumble.test']);
        // require(['tile.test']);
        // require(['timer.test']);
        // require(['data.test']);
    }
//  INIT
    $(function () {
        if (Db) {
            expose();
            runTests();
        }
        doBindings();
    });

});
