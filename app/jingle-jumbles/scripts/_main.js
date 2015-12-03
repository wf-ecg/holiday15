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
    var share = {
        greet: 'Happy holidays! I thought you might like to play the holiday Jingle Jumbles anagram game',
        index: 'http://www.wellsfargomedia.com/irt/holidays/jingle-jumbles/',
        link: '',
        message: '',
        score: '',
        subject: 'Wells Fargo Jingle Jumbles',
        title: '',
    };

    // repair page determination
    if (W.location.hash.slice(1) === 'wystar') {
        W.location.href = 'wystar.html';
    }
    if (!$('html').is('.wystar')) {
        share.index += 'index.html';
        share.greet += ' from Wells Fargo.';
    } else {
        share.index += 'wystar.html';
        share.greet += ' from Wells Fargo and WyStar Global Retirement Solutions.';
    }

    $.watchResize(function () {
        var ua = W.navigator.userAgent;
        if (ua.match(/mobi/i)
            || $(W).width() < 768) { // simulate
            $('html').removeClass('desktop');
            $('html').addClass('mobile');
        } else {
            $('html').removeClass('mobile');
            $('html').addClass('desktop');
        }
        if (ua.match(/chrome/i)) {
            $('html').addClass('chrome');
        } else if (ua.match(/safari/i)) {
            $('html').addClass('safari');
        } else if (ua.match(/firefox/i)) {
            $('html').addClass('firefox');
        } else if (ua.match(/trident/i)) {
            $('html').addClass('trident');
        }
    }, 'markAgent');
    $.swallowBackspace();
    $.watchInputDevice();

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    function db(num) {
        return W.debug > (num || 0);
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
        customizeShare(score, rating);
    }

    function customizeShare(score, rating) {
        share.score = 'I scored ' + score + '.';

        switch (rating) {
            case 'okay':
                share.title = share.score + ' I’m a Jingle Jumbles rock star.';
                share.message = 'Now it’s your turn. ';
                break
            case 'good':
                share.title = share.score + ' I’m a Jingle Jumbles word master.';
                share.message = 'I double-dog dare you to beat my score. ';
                break
            default:
                share.title = share.score + ' I’m a Jingle Jumbles natural.';
                share.message = 'Can you beat my score? ';
        }

        share.message += 'See how many Jingle Jumbles you can solve.';

        share.long = share.title + ' ' + share.message;
        share.email = share.title + ' ' + share.message + ' ' + share.index;

        updateShare(share);
    }

    function updateShare(share) {

        function querify(str, obj) {
            var url = str.replace('|', ':') + $.param(obj).replace(/\+/g, '%20');

            if (db()) {
                C.info(obj, url); //W.open(url);
            }
            return url;
        }

        $('#shareBarDynamic a.icon-facebook')
            .attr('href', querify('https|//www.facebook.com/dialog/feed?', {///www.facebook.com/sharer/sharer.php?u=
                app_id: '189445374730755',
                caption: share.score,
                description: share.long,
                display: 'popup',
                link: share.index,
                redirect_uri: share.index,
            }));
        $('#shareBarDynamic a.icon-twitter')
            .attr('href', querify('https|//twitter.com/intent/tweet?', {
                text: share.title,
                url: share.index,
            }));
        $('#shareBarDynamic a.icon-googleplus')
            .attr('href', querify('https|//plus.google.com/share?', {
                url: share.index,
            }));
        $('#shareBarDynamic a.icon-share')
            .attr('href', querify('mailto|?', {
                body: share.email,
                subject: share.subject,
            }));
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
