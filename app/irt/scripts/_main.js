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
    var totalWon;
    var duration = 120;
    var game, message, timer;
    var share = {
        title: '',
        message: '',
        link: '',
    };
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

    $('.shareBar').first().load('../includes/main_share.html .shareBar > *', function () {
        var me = $(this),
            str = me.html();
        if ($('html').is('.wystar')) {
            str = str.replace(/holidays\/irt\//g, 'holidays/irt/wystar.html');
        } else {
            str = str.replace(/holidays\/irt\//g, 'holidays/irt/index.html');
        }
        me.html(str);
    });

    $.markAgent();
    $.swallowBackspace();
    $.watchInputDevice();

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
        updateShare(score, rating);
    }
    function updateShare(score, rating) {
        share.title = 'I scored ' + score + '.';

        switch (rating) {
            case 'okay':
                share.title += ' I’m a Jingle Jumbles rock star.';
                share.message = 'Now it’s your turn.';
                break
            case 'good':
                share.title += ' I’m a Jingle Jumbles word master.';
                share.message = 'I double-dog dare you to beat my score.';
                break
            default:
                share.title += ' I’m a Jingle Jumbles natural.';
                share.message = 'Can you beat my score?';
        }
        share.message += ' See how many Jingle Jumbles you can solve.';
        C.warn(share);
    }
    function hideAreas() {
        El.jumble.hide();
        El.intro.hide();
        El.outro.hide();
    }
    function showIntro() {
        El.outro.find('.shareBar ul').appendTo(El.header.find('.shareBar'));

        hideAreas();
        showRating(0);
        El.intro.show();
        timer.force('Start');
    }
    function showOutro() {
        El.header.find('.shareBar ul').appendTo(El.outro.find('.shareBar'));

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
