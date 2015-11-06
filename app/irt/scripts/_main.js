/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'modal', 'letter', 'timer', 'data'], function
    MAIN($, Modal, Letter, Timer, Data) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 1);
    }
    function expose(obj, log) {
        if (db()) {
            W.Main = Main; // expose for dev
            $.extend(Main, obj);
        }
        if (log)
            C.info(Nom, Main);
    }

//EXTEND
    expose({
        Letter: Letter,
        Modal: Modal,
        Timer: Timer,
    });

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    $('header').first().load('../includes/main_header.html header > *');

//  PRIVATE
    function startTimer(sec) {
        Main.testTimer = new Timer({
            bottom: -3,
            div: '.jumble .timer',
            time: sec || 3,
        }).start();
    }

    function fillDisplays() {
        fillDisplay(slots, 'slot unsolved', '.gameOutput');
        fillDisplay(tiles, 'tile unused', '.gameInput');

        $.each(tiles, wireTile);
    }

    function fillDisplay(arr, css, sel) {
        var div = $(sel);

        $.each(arr, function () {
            var ele = this //
                .type(css) // classify
                .element() // generate
                .appendTo(div);
            if (ele.is('.space')) {
                ele.before(' ');
            }
        });
    }

    var pair, tiles, slots, nowO, nowE;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function setNow() {
        // make now highlighted
        nowE = $('.slot.unsolved').first();
        nowE.addClass('now');
        nowO = nowE.data('Letter');
        return nowE;
    }

    function wireTile() {
        var self = this;

        self.element().on('click', function () {
            $.publish('check.Tile', self);
        });
    }

    function checkSlot(tryO) {
        var tryL = tryO.letter();

        if (nowO.check(tryL)) {
            $.unsubscribe('check.Tile');
            nowO.solve();
            tryO.element() //
                .off('click') //
                .addClass('used') //
                .removeClass('unused');
            loop();
        }
    }

    function loop() {
        if (!setNow().length) {
            Main.testTimer.stop();
            $('.gameOutput').addClass('won');
        }

        $.subscribe('check.Tile', function (e, o) {
            checkSlot(o);
        });
    }

    function startGame() {
        $('.gameOutput').removeClass('won');
        pair = Data.get();
        tiles = Letter.assemble(pair.anagram.toUpperCase());
        slots = Letter.assemble(pair.correct.toUpperCase());
        expose({
            pair: pair,
            tiles: tiles,
            slots: slots,
        }, true);

        //kickoff loop
        fillDisplays();
        startTimer(30);
        loop();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function runTests() {
//        require(['tests/jumble.test']);
//        require(['tests/tile.test']);
//        require(['tests/timer.test']);
//        require(['tests/data.test']);
    }
    function doBindings() {
        $.watchInputDevice();
        $.watchResize(function () {
            Main.mobile = Boolean(W.navigator.userAgent.match(/mobi/i));
            if (Main.mobile) {
                $('html').addClass('mobile');
            } else {
                $('html').removeClass('mobile');
            }
        });
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);
        runTests();
        doBindings();
        startGame();
    });

});
