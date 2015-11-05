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
        if (!setNow()) {
            // done!
        }

        $.subscribe('check.Tile', function (e, o) {
            checkSlot(o);
        });
    }

    function startGame() {
        pair = Data.get();
        tiles = Letter.assemble(pair.anagram.toUpperCase());
        slots = Letter.assemble(pair.correct.toUpperCase());

        fillDisplays();
        startTimer(30);

        //kickoff loop
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
    }
    function expose() {
        W.Main = Main; // expose for dev
        $.extend(Main, {
            Modal: Modal,
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
        startGame();
    });

});
