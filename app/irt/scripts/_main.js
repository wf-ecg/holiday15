/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'modal', 'timer', 'game', 'message'], function
    MAIN($, _, Modal, Timer, Game, Message) {
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
    var game, message, timer;
    var El = {
        intro: '.intro',
        outro: '.outro',
        jumble: '.jumble',
        start: '.intro button',
        again: '.outro button',
        score: '.status .score'
    };

    //$('header').first().load('../includes/main_header.html header > *');
    $.watchInputDevice();
    $.swallowBackspace();
    $.watchResize(function () {
        Main.mobile = Boolean(W.navigator.userAgent.match(/mobi/i));

        if (Main.mobile || $(W).width() < 768) {
            $('html').addClass('mobile'); // simulate
        } else {
            $('html').removeClass('mobile');
        }
    });

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

    // - - - - - - - - - - - - - - - - - -
    // WIRING
    function updateScore(score) {
        var str = ' point';
        if (!score) {
            El.score.html('');
            return;
        } else if (score > 1) {
            str += 's';
        }
        El.score.html('/ ' + score + str);
    }
    function hideAreas() {
        El.jumble.hide();
        El.intro.hide();
        El.outro.hide();
    }
    function showIntro() {
        hideAreas();
        El.intro.show();
        timer.force('Start');
    }
    function showOutro() {
        timer.stop();
        hideAreas();
        El.outro.show() //
            .find('.score').text(totalWon);
        timer.reset();
    }
    function showJumble() {
        message.init();
        totalWon = 0;
        updateScore();
        hideAreas();
        El.jumble.show();
        timer.start(duration);
        game.start();
    }

//  INIT
    function doBindings() {
        $.reify(El);

        El.start.on(ACT, showJumble);
        El.again.on(ACT, showIntro);

        game = new Game();
        message = new Message();
        timer = new Timer({
            bottom: -1,
            warn: 9,
            div: '.game .timer',
            cb: showOutro,
        });

        expose({
            Modal: Modal,
            message: message,
            game: game,
            timer: timer,
        });

        $.subscribe('expose.Main', function () {
            expose(arguments[1]);
        });
        $.subscribe('win.Game', function () {
            message.cheer();
            updateScore(++totalWon);
            timer.stop();
        });
        $.subscribe('next.Game', function () {
            message.init();
            timer.add(1).start();
        });

        showIntro();
    }

    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);
        //require(['tests/timer.test']);
        doBindings();
    });

});

/*



 */
