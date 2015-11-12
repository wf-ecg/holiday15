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

    // - - - - - - - - - - - - - - - - - -
    // EXTEND
    var ACT = 'keypress click';
    var totalWon = 0;
    var duration = 120;
    var game, timer;

    $('header').first().load('../includes/main_header.html header > *');

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    function db(num) {
        return W.debug > (num || 1);
    }
    function expose(obj) {
        if (db(0)) {
            W.Main = Main; // expose for console
            $.extend(Main, obj);
            C.info(Nom, 'expose', obj);
        }
    }
    expose({
        Data: Data,
        Modal: Modal,
    });

    function runTests() {
        //require(['tests/timer.test']);
        //require(['tests/data.test']);
    }

    // - - - - - - - - - - - - - - - - - -
    // WIRING
    function hideAreas() {
        $('.jumble').hide();
        $('.intro').hide();
        $('.outro').hide();
    }
    function showIntro() {
        hideAreas();
        $('.intro').show();
        timer.force('Start') //
            .ele().off(ACT).on(ACT, showJumble);
    }
    function showOutro() {
        timer.stop();
        hideAreas();
        $('.outro').show().find('.score').text(totalWon);
        timer.reset().force('Try Again') //
            .ele().off(ACT).on(ACT, showIntro);
    }
    function showJumble() {
        hideAreas();
        $('.jumble').show();
        timer.start(duration) //
            .ele().off(ACT);
        game.start();
    }

    function doBindings() {
        $.watchInputDevice();
        $.watchResize(function () {
            Main.mobile = Boolean(W.navigator.userAgent.match(/mobi/i));
            if (Main.mobile || $(W).width() < 768) {
                $('html').addClass('mobile');
            } else {
                $('html').removeClass('mobile');
            }
        });

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

        $.subscribe('expose.Main', function () {
            expose(arguments[1]);
        });
        $.subscribe('win.Game', function () {
            totalWon++;
        });

        showIntro();
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);
        runTests();
        doBindings();
    });

});

/*



 */
