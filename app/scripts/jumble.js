/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10

 USE
 ...

 TODO
 ...
 */

define(['jquery'], function
    KLASS($) { // closure
    'use strict';

// CLASS
    var Nom = 'Jumble';
    var Self = Jumble;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        jumbles: [],
        _jumbles: [], // backup
        played: false,
    };

    function random(max) {
        return Math.floor(Math.random() * max);
    }
    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Jumble(phrase, cf) {
        var self = this;

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        if (!phrase) {
            throw new Error('no initial phrase');
        }
/// INSTANCE
        cf = $.extend(true, {
            correct: phrase,
        }, Df, cf);

        function checkInit() {
            if (!cf.inited)
                throw new Error('not inited');
        }
/// METHODS
        function addJumble(str) {
            cf._jumbles.push(str);
        }
        function getJumble() {
            var len = self.length();
            var num = arguments[0];

            checkInit();

            if (!len) {
                throw new Error('out of jumbles');
            } else if (typeof num !== 'number') {
                num = random(len);
            }
            return cf.jumbles.splice(num, 1);
        }
/// API
        $.extend(self, {
            add: addJumble,
            get: getJumble,
            init: function () {
                if (cf.inited) {
                    return 'inited';
                }
                self.reset();
                cf.inited = true;
            },
            length: function () {
                return cf.jumbles.length;
            },
            reset: function () {
                cf.jumbles = cf._jumbles.concat();
                cf.played = [];
            },
            verify: function (str) {
                return str === cf.correct;
            },
            dump: function () {
                self._ = JSON.stringify(cf)
                    .replace(/,/g, '", ')
                    .replace(/\"/g, '');
                return self;
            },
        });

/// INIT
        if (db()) {
            C.warn(Nom, self.dump());
        }
    }

    return Jumble;
});
/*

 take a phrase
 load anagrams
 display



 */
