/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10

 USE
 ...

 TODO
 ...
 */

define(['jquery', 'lodash'], function
    KLASS($, _) { // closure
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
            pos: null,
            colors: ['red', 'pink', 'lime', 'blue', 'yellow'],
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
            saveOffset: function () {
                return self.pos = cf.ele.offset();
            },
            position: function (obj) { // get:set
                if (obj) {
                    self.pos = obj;
                    cf.ele.css(obj);
                    cf.ele.one('webkitTransitionEnd transitionend', function() {
                        $.publish('redraw');
                    });
                } else {
                    return self.pos;
                }
            },
            swapWith: function (tile) {
                var e1 = cf.ele;
                var e2 = tile.get();
                var n1 = e1.next();

                e1.insertBefore(e2);
                if (n1) {
                    e2.insertBefore(n1);
                } else {
                    e2.appendTo(e2.parent())
                }
            },
            val: function () {
                return cf.val;
            },
            randomColor: function (ele) {
                $(ele).css({
                    backgroundColor: self.colors[_.random(4)],
                });
            },
            handleSpace: function () {
                //self.randomColor(cf.ele);
                cf.ele.addClass('space');
                cf.ele.html('&nbsp');
            },
            set: function (char) {
                cf.val = char;
                if (char === ' ') {
                    self.handleSpace(cf.ele);
                } else {
                    cf.ele.html(char);
                }
            },
            get: function () {
                return cf.ele;
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
