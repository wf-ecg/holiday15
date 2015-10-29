/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10

 USE
 ...

 TODO
 ...
 */

define(['jquery', 'lodash', 'tile'], function
    KLASS($, _, Tile) { // closure
    'use strict';

// CLASS
    var Nom = 'Shuffle';
    var Self = Shuffle;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        phrase: 'THRAGE',
        div: '.shuffle',
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
            display: function () { // tell each to draw
                C.log(Nom, 'display');
                self.unfreeze();
                cf.div.empty();
                self.tiles.forEach(function (e) {
                    e.appendTo(cf.div);
                });
                self.freeze();
            },
            indexOf: function (char, skip) {
                var idx = cf.anagram.indexOf(char);
                cf.anagram[idx] = '*';
                return idx;
            },
            toString: function () {
                return cf.anagram.join('');
            },
            freeze: function () {
                cf.div.freezeKids();
                self.tiles.forEach(function (e) {
                    e.saveOffset(); // reset saved position
                });
            },
            unfreeze: function () {
                cf.div.unfreezeKids();
            },
            swap: function (a, b) {
                if (a < 0 || b < 0 ) return; // reject bad indexes
                $.swapper(self.tiles, a, b); // reorder tiles (primitive way)
                $.swapper(cf.anagram, a, b); // reorder current anagram state
                var t1 = self.tiles[a];
                var t2 = self.tiles[b];
                self.swapPose(t1, t2);
                //t1.swapWith(t2);
            },
            swapPose: function (t1, t2) {
                // animate div1 and div2 tile coordinates
                var p1 = t1.position();
                var p2 = t2.position();
                t1.position(p2);
                t2.position(p1);
            },
            create: function () {
                self.tiles = cf.anagram.map(function (e) {
                    return new Tile(e); // make tiles
                });
            },
            destroy: function () {
                C.log(Nom, 'destroy');
                $(W).off('resize', self._redraw);
            },
            init: function (phrase) {
                cf.phrase = phrase;
                cf.div = $(cf.div);
                cf.anagram = phrase.split('');
                self.create();
                self._redraw = _.throttle(self.display, 333);
                $(W).on('resize', self._redraw);
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init(phrase || cf.phrase);
    }
    return Shuffle;
});
/*



 */
