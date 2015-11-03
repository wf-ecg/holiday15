/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'sequence', 'shuffle', 'data', 'message'], function
    MAIN($, _, Seq, Shuf, Data, Msg) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 0;

    var pair, correct, anagram, play, scroll;
    var attempt = 0;
    var msgs = new Msg();
    var shuffle = new Shuf();
    var sequence = new Seq('', {
        random: !true,
    }); // blank but randomized

//EXTEND
    watchResize(function () {
        Main.mobile = Boolean(W.navigator.userAgent.match(/mobi/i));
        if (Main.mobile) {
            $('html').addClass('mobile');
        } else {
            $('html').removeClass('mobile');
        }
    });

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    function begin() {
        var tmp;

        scrollUp();
        msgs.show('intro');

        play.fadeOut();
        pair = '';
        do { // skip incongruent data sets
            if (attempt++ > 99) throw new Error('out of data');
            pair = Data.get();
        } while (!pair.anagram);

        correct = pair.correct.toUpperCase();
        anagram = pair.anagram.toUpperCase();
        tmp = anagram + ' -> ' + correct;

        if (Main.mobile) {
            correct = correct.replace(/\s/g, '\n');
            anagram = anagram.replace(/\s/g, '\n');
        }
        anagram = ' ' + anagram; // hack that seems to work
        shuffle.init(anagram);
        sequence.init(anagram);

        shuffle.display();
        watchScroll(_.throttle(doNext, 666));
        C.log(Nom, 'begin', sequence.array, tmp);
    }
    function done() {
        watchScroll();
        shuffle.destroy();
        scrollUp();
        msgs.show('finish', _.delay(function () {
            scroll.one('scroll', begin);
        }, 2222));
    }
    function scrollUp() {
        msgs.cheer();
        scroll.scrollTop(0);
    }
    function doNext() {
        var i, j, l, w;

        if (scroll.scrollTop() < 999) return;

        try {
            i = sequence.getNext();
        } catch (err) {
            C.log(err);
            return done();
        }
        l = correct[i];
        j = shuffle.indexOf(l, i);
        w = anagram[i];
        if (j > -1) {
            shuffle.tiles[j].get().addClass('correct');
            if (l && (i !== j) && (l !== w)) {
                shuffle.swap(i, j);
                scrollUp();
                C.log(Nom, 'doNext SWAP', [i, j], [l, w], [shuffle.toString()]);
            } else {
                C.log(Nom, 'doNext skip', [i, j], [l, w], [shuffle.toString()]);
                doNext();
            }
        }
        if (sequence.check() < 2) return doNext();
    }

//  PRIVATE
    function watchInputDevice() {
        var body = $('body');
        body.on('keydown', function () {
            body.removeClass('mouse');
            body.addClass('keyboard');
        }).on('mousemove', function () {
            body.removeClass('keyboard');
            body.addClass('mouse');
        });
    }
    function watchScroll(fn) {
        if (fn) {
            watchScroll.last = fn;
            scroll.on('scroll', fn);
        } else {
            scroll.off('scroll', watchScroll.last);
        }
    }
    function watchResize(fn) {
        if (fn) {
            watchResize.last = fn;
            $(W).on('resize', fn);
            fn();
        } else {
            $(W).off('resize', watchResize.last);
        }
    }
    function doBindings() {
        scroll = $('.scrollOuter');
        play = scroll.find('button');

        watchInputDevice();
    }
    function expose() {
        W.Main = Main; // expose for dev
        $.extend(Main, {
            shuffle: shuffle,
            sequence: sequence,
            data: Data,
        });
        C.log(Main);
    }

//  INIT
    $(function () {
        Main.begin = begin;
        doBindings();
        if (Db) {
            expose();
        }
        begin();
    });

});

/*




 */
