/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'modal', 'jumble', 'tile', 'timer', 'data', 'conf'], function
    MAIN($, Modal, Jumble, Tile, Timer, Data, Conf) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 1);
    }

//EXTEND

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    $('header').first().load('../includes/main_header.html header > *');

//  PRIVATE
    function startTimer(sec) {
        Main.testTimer = new Timer({
            div: '.jumble .timer',
            time: sec || 3,
            cb: function () {
                this.div.css('color', 'red');
            },
        }).start();
    }
    function connectTiles(a, b, c) {
        return new Tile({
            display: a,
            reveal: b,
            letter: c,
        });
    }
    function runTests() {
//        require(['tests/jumble.test']);
//        require(['tests/tile.test']);
//        require(['tests/timer.test']);
//        require(['tests/data.test']);
    }
    // spaces are gaps on the eles since they never shift
    var pair = Data.get();
    var tiles = Conf.assemble(pair.anagram);
    var slots = Conf.assemble(pair.correct);

    function fillDisplays() {
        fillDisplay(slots, 'slot', '.gameOutput');
        fillDisplay(tiles, 'tile', '.gameInput');
    }

    function fillDisplay(arr, css, sel) {
        var div = $(sel);

        $.each(arr, function (i, e) {
            var ele = e.type(css).genEle();

            ele.appendTo(div);

            if (ele.is('.space')) {
                ele.before(' ');
            }
        });
    }

    function doBindings() {
        $.watchInputDevice();
    }

    function expose() {
        W.Main = Main; // expose for dev
        $.extend(Main, {
            Modal: Modal,
            Jumble: Jumble,
            Tile: Tile,
            Timer: Timer,
            pair: pair,
            tiles: tiles,
            slots: slots,
        });

        C.info(Nom, 'init @', new Date(), 'debug:', db(), Main);
    }

//  INIT
    $(function () {
        if (db()) {
            expose();
            runTests();
        }
        doBindings();
        fillDisplays();
        startTimer();
    });

});
