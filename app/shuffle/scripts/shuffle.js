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
        div: '.shuffle',
        phrase: 'THRAGE',
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
        function bind() {
            cf.div = $(cf.div);
            self._redraw = _.throttle(self.display, 333);
            $(W).on('resize', self._redraw);
            $.subscribe('redraw', self._redraw);
        }
        function dump() {
            self._ = JSON.stringify(cf)
                .replace(/,/g, '", ') // kill quotes
                .replace(/\"/g, '');
            return self;
        }
        function stick() {
            cf.div.freezeKids();
            self.tiles.forEach(function (tile) {
                tile.saveOffset(); // reset saved position
            });
        }
        function unstick() {
            cf.div.unfreezeKids();
        }
        function swapPose(t1, t2) {
            var p1, p2;
            // animate div1 and div2 tile coordinates
            p1 = t1.position();
            p2 = t2.position();
            t1.position(p2);
            t2.position(p1);
        }

/// API
        $.extend(self, {
            _redraw: $.noop,
            anagram: '',
            tiles: [],
            display: function () { // tell each to draw
                unstick();
                cf.div.empty();
                self.tiles.forEach(function (tile) {
                    tile.appendTo(cf.div);
                });
                stick();
            },
            indexOf: function (char) {
                var idx = self.anagram.indexOf(char);
                self.anagram[idx] = '*';
                return idx;
            },
            toString: function () {
                return self.anagram.join('').replace('\n', ' ');
            },
            valueOf: function () {
                return cf.phrase;
            },
            getElements: function () {
                return $.map(self.tiles, function (e) {
                    return e.get()[0];
                });
            },
            getSpaces: function () {
                return $(self.getElements()).filter('.space');
            },
            swap: function (i1, i2) {
                $.swapper(self.tiles, i1, i2); // reorder tiles (primitive way)
                $.swapper(self.anagram, i1, i2); // reorder current anagram state
                swapPose(self.tiles[i1], self.tiles[i2]);
            },
            destroy: function () {
                C.log(Nom, 'destroy', self.toString());
                $(W).off('resize');
                $.unsubscribe('redraw');
            },
            conf: function (obj) {
                $.extend(cf, obj);
            },
            init: function (phrase) {
                cf.phrase = phrase;

                self.anagram = cf.phrase.split('');
                self.tiles = self.anagram.map(function (e) {
                    return new Tile(e); // make tiles
                });
                bind();
            },
            dump: db() ? dump : $.noop,
            unfreeze: unstick,
        });

/// INIT
        self.init(phrase || cf.phrase);
    }
    return Shuffle;
});
/*



 */
