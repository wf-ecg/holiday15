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

    var pair = Data.get();
    var correct = pair.correct.toUpperCase();
    var anagram = pair.anagram.toUpperCase();

    var shuffle = new Shuf(anagram);
    var sequence = new Seq(anagram, true); // true for not random

//EXTEND
    Main.mobile = !PC;

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    function begin() {
        W.alert('Scroll to play game');
        shuffle.display();
    }
    function done() {
        if (W.confirm('Play again?')) {
            W.location.reload();
        } else {
            $('.scrollOuter').off('scroll');
            doNext = $.noop;
        }
    }
    function doNext() {
        try {
            var i = sequence.getNext();
            var l = correct[i];
            var j = shuffle.indexOf(l, i);
            var s = shuffle.toString();

            if (i !== j) {
                shuffle.swap(i, j);
            } else {
                C.log(Nom, 'trying again', i, l, s);
                doNext();
            }
        } catch (err) {
            shuffle.unfreeze();
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
    function doBindings() {
        watchInputDevice();
        $('.scrollOuter').on('scroll', _.throttle(doNext, 333));
    }
    function expose() {
        W.main = Main; // expose for dev
        $.extend(Main, {
            correct: correct,
            anagram: anagram,
            shuffle: shuffle,
            sequence: sequence,
        });
    }

//  INIT
    $(function () {
        if (Db) {
            expose();
            //runTests();
        }
        doBindings();
        begin();
    });

});

/*




 */
