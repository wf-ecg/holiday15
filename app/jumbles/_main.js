/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'dialog', 'modal', 'timer', 'game', 'message', 'share'], function
    MAIN($, _, Dialog, Modal, Timer, Game, Message, Share) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    // - - - - - - - - - - - - - - - - - -
    // EXTEND
    var ACT = 'keypress click';
    var totalWon;
    var duration = 120;
    var game, message, timer;

    var El = {
        intro: '.intro',
        outro: '.outro',
        jumble: '.jumble',
        start: '.intro button',
        again: '.outro button',
        score: '.status .score',
        header: 'header',
        rating: '.ratings',
    };


    function db(num) {
        return W.debug > (num || 0);
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

    expose({
        Share: Share,
        game: gameMode,
    });

    $.ajaxSetup({// disable caching
        cache: false,
    });

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    var dialog = $('.modal .dialog').first();
    var header = $('header').first();
    var pushin = $('.pushin').first();
    var button = header.find('button').first();

    function detachShare(x) {
        if (!x) {
            $('.row-offcanvas').removeClass('active');
            pushin.find('.shareBar ul').appendTo(header.find('.shareBar'));
        } else {
            $('.row-offcanvas').addClass('active');
            header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
        }
    }

    button.click(function () {
        button.toggleClass('collapsed');

        if (button.is('.collapsed')) {
            detachShare(false);
        } else {
            detachShare(true);
        }
    });

    $.watchResize(function () {
        if (!button.is('.collapsed')) {
            button.click();
        }
        gameMode();
    });

    pushin.load('../includes/main_pushin.html .pushin > *', function () {
        $(W).trigger('resize');
    });
    dialog.load('../includes/main_dialog.html .dialog > *', Dialog.bind);

    $.swallowBackspace();
    $.watchInputDevice();
    $.markAgent();

    // - - - - - - - - - - - - - - - - - -
    // WIRING
    function gameMode() {
        if ($('html').is('.mobi')) {
            return;
        }
        button.click();
        $('.frame .row-offcanvas').removeClass('active');
        header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
    }

    function updateScore(score) {
        El.score.html('Score: ' + (score || 0));
    }
    function showRating(score) {
        var rating = '';

        El.outro.find('.score').text(score);
        El.rating.find('span').removeClass('active');

        if (score > 4) {
            rating = 'good';
        } else if (score > 2) {
            rating = 'okay';
        } else if (score > 0) {
            rating = 'lame';
        }
        if (rating) {
            El.rating.find('.' + rating).addClass('active');
        }
        Share.tweak(score, rating);
    }

    function hideAreas() {
        El.jumble.hide();
        El.intro.hide();
        El.outro.hide();
    }
    function showIntro() {
        //El.outro.find('.shareBar ul').appendTo(El.header.find('.shareBar'));

        hideAreas();
        showRating(0);
        El.intro.show();
        timer.force('Start');
    }
    function showOutro() {
        //El.header.find('.shareBar ul').appendTo(El.outro.find('.shareBar'));

        timer.stop();
        hideAreas();
        El.outro.show();
        showRating(totalWon);
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
        $.doneLoading();
        $.watchHash();
        $.reify(El);

        El.start.on(ACT, showJumble);
        El.score.click(function () {
            if (db()) {
                $.publish('finish.Timer');
            }
        });
        El.again.on(ACT, showIntro);

        game = new Game();
        message = new Message();
        timer = new Timer({
            bottom: -1,
            warn: 9,
            div: '.game .timer',
        });

        expose({
            Modal: Modal,
            Share: Share,
            message: message,
            game: game,
            timer: timer,
        });

        $.subscribe('finish.Timer', function () {
            showOutro();
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
            message.init(); // show instructions
            timer.add(1).start();  // restart the timer
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
