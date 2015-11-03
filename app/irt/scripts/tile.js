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
        display: '<div>',
        reveal: '<div>',
        letter: 'Y',
        used: false,
        revealed: false,
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Tile(cf) {
        var self = this;

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
            pressing: function () {
                // change style
                // if not active
                // return
                this.reveal();
                this.deactivate();
            },
            assignDisplay: function (sel) {
                var me = $(sel).first();

                me.data(Nom, self) //
                .on('click', function () {
                    if (me.is('.used')) {
                        self.deactivate();
                    } else {
                        self.activate();
                    }
                });
                cf.display = me;
            },
            assignReveal: function (sel) {
                cf.reveal = $(sel).first();
            },
            assignLetter: function (str) {
                cf.reveal.add(cf.display).text(str);
            },
            activate: function () {
                cf.reveal.addClass('active');
                cf.display.addClass('used');
                return self;
            },
            deactivate: function () {
                cf.reveal.removeClass('active');
                cf.display.removeClass('used');
            },
            reveal: function () {
                // activate cf.revealed
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.assignDisplay(cf.display);
        self.assignReveal(cf.reveal);
        self.assignLetter(cf.letter);
    }

    return Tile;
});
/*

 take a phrase
 load anagrams
 display



 */
