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
        ele: '<span class="tile">',
        char: 'X',
    };
    var colors = ['red', 'pink', 'lime', 'blue', 'yellow'];

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Tile(char, cf) {
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
        cf.ele = $(cf.ele);

/// METHODS
        function dump() {
            self._ = JSON.stringify(cf)
                .replace(/,/g, '", ') // kill quotes
                .replace(/\"/g, '');
            return self;
        }
        function handleBreak() {
            cf.ele.addClass('break');
        }
        function handleSpace() {
            //randomColor(cf.ele);
            cf.ele.addClass('space');
            cf.ele.html(' ');
        }
        function randomColor(ele) {
            $(ele).css({
                backgroundColor: colors[_.random(4)],
            });
        }
        function set(char) {
            cf.char = char;
            if (char === '\n') {
                handleBreak(cf.ele);
            } else if (char === ' ') {
                handleSpace(cf.ele);
            } else {
                cf.ele.html(char);
            }
            cf.ele.data(Nom, self); // save to element
        }

/// API
        $.extend(self, {
            pos: null,
            appendTo: function (sel) {
                $(sel).append(cf.ele);
            },
            get: function () {
                return cf.ele;
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
            saveOffset: function () {
                return self.pos = cf.ele.offset();
            },
            init: function (char) {
                set(char);
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init(char || cf.char);
    }
    return Tile;
});
/*




 */
