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
    var Nom = 'Sequence';
    var Self = Sequence;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        phrase: 'the quick brown fox',
        random: false,
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Sequence(phrase, cf) {
        var self = this
            ;
        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }

/// INSTANCE
        cf = $.extend(true, {}, Df, cf);
        if (db()) {
            self._ = cf;
        }

/// METHODS
        function dump() {
            self._ = JSON.stringify(cf)
                .replace(/,/g, '", ') // kill quotes
                .replace(/\"/g, '');
            return self;
        }

/// API
        $.extend(self, {
            array: [],
            check: function () {
                return self.array.length;
            },
            getNext: function () {
                if (!self.check()) {
                    throw new Error('out of numbers');
                }
                return self.array.shift();
            },
            valueOf: function () {
                return cf.phrase;
            },
            create: function (len) {
                for (var arr = [], i = 0; i < len; i++) {
                    arr[i] = i;
                }
                self.array = cf.random ? $.shuffler(arr) : arr;
            },
            init: function (phrase) {
                cf.phrase = phrase;
                self.create(cf.phrase.length);
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init(phrase || cf.phrase);
    }
    return Sequence;
});
/*



 */
