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
    var timer = new Timer({
        bottom: -3,
        warn: 3,
        div: '.game .timer',
        cb: showOutro,
    });
    var ACT = 'keypress click';
    var totalWon = 0;
    var duration = 120;

//EXTEND
    expose({
        Letter: Letter,
        Modal: Modal,
        timer: timer,
    });

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    $('header').first().load('../includes/main_header.html header > *');

//  PRIVATE
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

        self.element().on(ACT, function (evt) {
            var key = evt.keyCode;

            if (key && (key !== 32 && key !== 13))
                return;

            $.publish('check.Tile', self);
        });
    }

    function checkSlot(tryO) {
        var tryL = tryO.letter();

        if (nowO.check(tryL)) {
            $.unsubscribe('check.Tile');
            nowO.solve();
            tryO.element() //
                .off(ACT) //
                .addClass('used') //
                .removeClass('unused');
            loop();
        }
    }

    function loop() {
        if (!setNow().length) {
            $('.gameOutput').addClass('won');
            oneSolved(startGame);
        }
        $.subscribe('check.Tile', function (e, o) {
            checkSlot(o);
        });
    }

    function clearGame() {
        $('.gameInput').empty();
        $('.gameOutput').removeClass('won').empty();
    }

    function startGame() {
        clearGame();
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
        timer.start(duration);
        loop();
    }
    function hideAreas() {
        $('.jumble').hide();
        $('.intro').hide();
        $('.outro').hide();
    }
    function showIntro() {
        hideAreas();
        $('.intro').show();
        timer.force('Start').one(ACT, showJumble);
    }
    function showOutro() {
        timer.stop();
        hideAreas();
        $('.outro').show().find('.score').text(totalWon);
        timer.reset().force('Try Again').one(ACT, showIntro);
    }
    function showJumble() {
        hideAreas();
        $('.jumble').show();
        startGame();
    }
    function oneSolved(cb) {
        totalWon++;
        $('.jumble').css({
            position: 'relative',
        }).animate({
            left: 3333,
        }, 333, function () {
            $('.jumble').css({
                left: 0,
                position: 'static',
            });
            if (typeof cb === 'function')
                cb();
        });
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
        hideAreas();
        showIntro();
    });

});
