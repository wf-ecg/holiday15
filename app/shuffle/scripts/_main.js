/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'sequence', 'shuffle', 'data'], function
    MAIN($, Seq, Shuf, Data) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 0;
    var PC = !W.navigator.userAgent.match(/mobi/i);

    var pair, correct, anagram, shuffle, sequence, play, scroll;
    var attempt = 0;

//EXTEND
    Main.mobile = !PC;

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    function begin() {
        play.fadeOut();
        scrollUp();
        pair = '';
        do { // skip incongruent data sets
            if (attempt++ > 99) throw new Error('out of data');
            pair = Data.get();
        } while (!pair.anagram || pair.correct.length !== pair.anagram.length)

        correct = pair.correct.toUpperCase();
        anagram = pair.anagram.toUpperCase();
        if (shuffle) {
            shuffle.destroy();
        }
        shuffle = new Shuf(anagram);
        sequence = new Seq(anagram);
        C.log(anagram, '>', correct, sequence.array);
        shuffle.display();
    }
    function done() {
        play.fadeIn();
    }
    function scrollUp() {
        scroll.scrollTop(0);
    }
    function doNext() {
        try {
            var i, j, l, s, w;

            i = sequence.getNext();
            l = correct[i];
            j = shuffle.indexOf(l, i);
            s = shuffle.toString();
            w = anagram[i];

            if (i !== j) {
                shuffle.swap(i, j);
                scrollUp();
                C.log(Nom, 'SWAP', [i, j], [l, w], s);
            } else {
                C.log(Nom, 'same', [i, j], [l, w], s);
                doNext();
            }
        } catch (err) {
            _.delay(done, 999);
        }
    }

//  PRIVATE
    function watchInputDevice() {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mousemove', function () {
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    }
    function watchScroll() {
        scroll.on('scroll', function () {
            if ($(this).scrollTop() > 999) {
                doNext();
            }
        });
    }
    function doBindings() {
        scroll = $('.scrollOuter');
        play = scroll.find('button');

        watchInputDevice();
        watchScroll();
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
