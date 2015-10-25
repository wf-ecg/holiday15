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
        div: $('<div>'),
        val: 'X',
        cb: function () {
            C.info(Nom, 'done');
        },
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Tile(cf) {
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
                // get/set using div,
            },
            drawOn: function () {
                // append to On
            },
            freeze: function () {
                // set abs position
            },
            flow: function () {
                // set inline position
            },
            spin: function () {
                // animate div
            },
            val: function () {
                return cf.val;
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.assign(cf.div);
    }
    return Tile;
});
/*




 */
