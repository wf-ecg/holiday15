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
    var correct = pair.correct;
    var anagram = pair.anagram;

    var shuffle = new Shuf(anagram);
    var sequence = new Seq(anagram, true); // true for not random

//EXTEND
    Main.mobile = !PC;

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

    function done() {
        // show finished screen
        // play again?
    }
    function begin() {
        // dismiss start scren
        // tell each of [shuffle] to drawTo(screen)
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
    }
    function expose() {
        W.main = Main; // expose for dev
        $.extend(Main, {
            correct: correct,
            anagram: anagram,
            shuffle: shuffle,
            sequence: sequence,
        });

        Main.doNext = function () {
            shuffle.display();

            var i = sequence.getNext();
            var j = shuffle.indexOf(correct[i]);
            var s = shuffle.toString();

            if (i !== j) {
                shuffle.swap(i, j);
            } else {
                Main.doNext();
            }
            C.log(i, j, s);
        };
    }

    function runTests() {
        // require(['jumble.test']);
        // require(['tile.test']);
        // require(['timer.test']);
        // require(['data.test']);
        Main.doNext();
    }
//  INIT
    $(function () {
        if (Db) {
            expose();
            runTests();
        }
        doBindings();
    });

});

/*




 */
