/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'modal', 'jumble', 'tile', 'timer', 'data'], function
    MAIN($, Modal, Jumble, Tile, Timer, Data) {
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
    function startTimer(sec) {
        Main.testTimer = new Timer({
            div: '.jumble .timer',
            time: sec || 3,
            cb: function () {
                this.div.css('color', 'red');
            },
        }).start();
    }
    function doBindings() {
        watchInputDevice();
    }
    function expose() {
        W.main = Main; // expose for dev
        $.extend(Main, {
            Modal: Modal,
            Jumble: Jumble,
            Tile: Tile,
            Timer: Timer,
        });

        C.info(Nom, 'init @', new Date(), 'debug:', Db, Main);
    }
    function connectTiles(a, b, c) {
        return new Tile({
            display: a,
            reveal: b,
            letter: c,
        });
    }
    function pairAll() {
        var allA = $('.jumble .tiler span');
        var allB = $('.jumble .revealer span');

        Main.testTiles = [];
        allA.each(function (i) {
            Main.testTiles[i] = connectTiles(
                allA.eq(i),
                allB.eq(i),
                'abcdefghijklm'[i]
            );
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
        }
        doBindings();
        pairAll();
        startTimer()
    });

});
