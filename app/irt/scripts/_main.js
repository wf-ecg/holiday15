/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'modal', 'timer', 'data', 'game'], function
    MAIN($, _, Modal, Timer, Data, Game) {
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
        if (log) {
            C.info(Nom, 'expose', Main);
        }
    }
    var ACT = 'keypress click';
    var totalWon = 0;
    var duration = 120;
    var game, timer;

//EXTEND
    expose({
        Data: Data,
        Modal: Modal,
    });

    $('header').first().load('../includes/main_header.html header > *');
    $.subscribe('expose.Main', function (evt, data) {
        expose(data, true);
    });
    $.subscribe('win.Game', function () {
        totalWon++;
    });


//  PRIVATE
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function hideAreas() {
        $('.jumble').hide();
        $('.intro').hide();
        $('.outro').hide();
    }
    function showIntro() {
        hideAreas();
        $('.intro').show();
        timer.force('Start') //
            .ele().one(ACT, showJumble);
    }
    function showOutro() {
        timer.stop();
        hideAreas();
        $('.outro').show().find('.score').text(totalWon);
        timer.reset().force('Try Again') //
            .ele().one(ACT, showIntro);
    }
    function showJumble() {
        hideAreas();
        $('.jumble').show();
        timer.start(duration);
        game.start();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function runTests() {
//        require(['tests/jumble.test']);
//        require(['tests/tile.test']);
//        require(['tests/timer.test']);
//        require(['tests/data.test']);
    }
    function doBindings() {
        game = new Game({
            dat: Data,
        });
        timer = new Timer({
            bottom: -3,
            warn: 3,
            div: '.game .timer',
            cb: showOutro,
        });

        expose({
            game: game,
            timer: timer,
        });

        $.watchInputDevice();
        $.watchResize(function () {
            Main.mobile = Boolean(W.navigator.userAgent.match(/mobi/i));
            if (Main.mobile || $(W).width() < 768) {
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
        showIntro();
    });

});
