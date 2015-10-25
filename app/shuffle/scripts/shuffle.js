/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10

 USE
 ...

 TODO
 ...
 */

define(['jquery', 'tile'], function
    KLASS($, Tile) { // closure
    'use strict';

// CLASS
    var Nom = 'Shuffle';
    var Self = Shuffle;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        phrase: 'THRAGE',
        anagram: [],
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Shuffle(phrase, cf) { // init with an anagram
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
            tiles: [],
            check: function () {
                if (!self.array.length) {
                    throw new Error('out of numbers');
                }
            },
            getNext: function () {
                self.check();
                return self.array.shift();
            },
            display: function (sel) { // tell each to draw
                self.tiles.forEach(function (e) {
                    e.appendTo(sel || '.shuffle');
                });
            },
            indexOf: function (char) {
                return cf.anagram.indexOf(char);
            },
            toString: function () {
                return cf.anagram.join('');
            },
            swap: function (a, b) {
                $.swapper(self.tiles, a, b); // reorder tiles (primative way)
                $.swapper(cf.anagram, a, b); // reorder current anagram state
            },
            create: function () {
                self.tiles = cf.anagram.map(function (e) {
                    return new Tile(e); // make tiles
                });
            },
            init: function (phrase) {
                cf.anagram = phrase.split('');
                self.create();
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init(phrase || cf.phrase);
    }
    return Shuffle;
});
/*

    function swap(i1, i2) {
        // update [shuffle]
        swapper(shuffle, i1, i2);
        swapHelper(divs[i1], divs[i2]);
    }

    function swapHelper(div1, div2) {
        // animate div1 and div2 tile coordinates
        var pair1 = div1.getPos();
        var pair2 = div2.getPos();

        div1.setPos(pair2);
        div2.setPos(pair1);
    }


 */
