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
        nowO = nowE.data('Conf');
        return nowE;
    }

    function wireTile() {
        var self = this;
        self.element().on('click', function () {
            $.publish('check.Tile', self);
        });
    }
    function checkSlot(o) {
        var checkLetter = nowO.letter();
        var triedLetter = o.letter();
        // check o.letter() against
        C.error(checkLetter, triedLetter);
        // show letter for a second
        // get red and shake
        // or remove
    }
    function pushTo(obj) {
        // error if obj is not a Conf or not a Slot
        // attempts to choose pushes letter to another object
        //      calls a check from the object
        // there can be a push to the now slot (but it can't accept--- not my letter)
        // object can accept the check by returning boolean
        // if push is true, make self "used"
        // if i am used then deactivate selection actions
    }

    function loop() {
        setNow();
        // add callback for success

        $.subscribe('check.Tile', function (e, o) {
            C.log(Nom, o);
            checkSlot(o);
        });
    }

    function startGame() {
        pair = Data.get();
        tiles = Conf.assemble(pair.anagram.toUpperCase());
        slots = Conf.assemble(pair.correct.toUpperCase());

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
        startGame();
    });

});
