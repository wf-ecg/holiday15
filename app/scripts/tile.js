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
        used: false,
        revealed: false,
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Tile(char, cf) {
        var self = this;

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        if (!char) {
            throw new Error('no initial char');
        }

/// INSTANCE
        cf = $.extend(true, {
            letter: char,
        }, Df, cf);

/// METHODS
        function dump() {
            self._ = JSON.stringify(cf)
                .replace(/,/g, '", ')
                .replace(/\"/g, '');
            return self;
        }

/// API
        $.extend(self, {
            eles: {
                display: '<div>',
                reveal: '<div>',
            },
            pressing: function () {
                // change style
                // if not active
                // return

                this.reveal();
                this.deactivate();
            },
            activate: function () {

            },
            deactivate: function () {

            },
            reveal: function () {
                // activate cf.revealed
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        if (db()) {
        }
    }

    return Tile;
});
/*

 take a phrase
 load anagrams
 display



 */
