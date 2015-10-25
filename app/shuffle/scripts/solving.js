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
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Sequence(cf) {
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
            check: function () {
                if (!self.array.length) {
                    throw new Error('out of numbers');
                }
            },
            getNext: function () {
                self.check();
                return self.array.shift();;
            },
            create: function (len, shuf) {
                for( var arr =[], i = 0; i < len; i++) {
                    arr[i] = i;
                }
                self.array = shuf ? shuffler(arr) : arr;
            },
            init: function (phrase) {
                self.create(phrase.length);
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init(cf.phrase);
    }
    return Sequence;
});
/*



 */
