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
    var Nom = 'Tile';
    var Self = Tile;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        ele: '<div class="tile">',
        val: 'X',
        cb: function () {
            C.info(Nom, 'done');
        },
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Tile(letter, cf) {
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
            coordinates: function (x, y) {
                // get/set using cf.ele,
            },
            appendTo: function (sel) {
                $(sel).append(cf.ele);
            },
            freeze: function () {
                // set abs position of cf.ele
            },
            flow: function () {
                // set inline position of cf.ele
            },
            spin: function () {
                // animate cf.ele
            },
            val: function () {
                return cf.val;
            },
            set: function (char) {
                cf.val = char;
                cf.ele.text(char);
            },
            init: function (letter) {
                cf.ele = $(cf.ele);

                self.set(letter);
                cf.ele.data(Nom, self);
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init(letter || self.val());
    }
    return Tile;
});
/*




 */
