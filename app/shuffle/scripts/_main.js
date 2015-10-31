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
    var PC = !W.navigator.userAgent.match(/mobi/i);

    var pair, correct, anagram, shuffle, sequence, play, scroll;
    var attempt = 0;
    var msgs = new Msg();

//EXTEND
    Main.mobile = !PC;

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    function begin() {
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
        shuffle = new Shuf(anagram);
        sequence = new Seq(anagram, true);
        C.log(anagram, '>', correct, sequence.array);
        shuffle.display();
        watchScroll(_.throttle(doNext, 666));
    }
    function done() {
        watchScroll();
        shuffle.unfreeze();
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
        if (scroll.scrollTop() < 1234) return;
        try {
            var i, j, l, s, w;

            i = sequence.getNext();
            l = correct[i];
            j = shuffle.indexOf(l, i);
            s = shuffle.toString();
            w = anagram[i];

            if (l && i !== j) {
                shuffle.swap(i, j);
                scrollUp();
                C.log(Nom, 'SWAP', [i, j], [l, w], s);
            } else {
                C.log(Nom, 'same', [i, j], [l, w], s);
                doNext();
            }
        } catch (err) {
            done();
        }
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
    function doBindings() {
        scroll = $('.scrollOuter');
        play = scroll.find('button');

        watchInputDevice();
    }
    function expose() {
        W.main = Main; // expose for dev
        $.extend(Main, {
            correct: correct,
            anagram: anagram,
            shuffle: shuffle,
            sequence: sequence,
            Data: Data,
        });
    }

//  INIT
    $(function () {
        Main.begin = begin;
        doBindings();
        begin();
        if (Db) {
            expose();
            //runTests();
        }
    });

});

/*




 */
