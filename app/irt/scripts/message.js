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
    var Nom = 'Message';
    var Self = Message;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        ele: '.message',
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Message(cf) {
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
            default: '<p>Choose letters to discover a holiday greeting.</p>',
            great: 'Great job!',
            awesome: 'Awesome!',
            nice: 'Nice work!',
            cheers: ['great', 'awesome', 'nice'],
            cheer: function (num) {
                num = Math.floor(num || (Math.random() * self.cheers.length));
                self.select(self.cheers[num]).show();
                return self;
            },
            select: function (prop) {
                self.write('<h1>' + self[prop || 'default'] + '</h1>');
                return self;
            },
            show: function (cb) {
                cf.ele.fadeIn().slideDown(function () {
                    if (typeof cb === 'function')
                        cb();
                    $.publish('redraw');
                });
                return self;
            },
            write: function (str) {
                cf.ele.hide().html(str);
                return self;
            },
            init: function () {
                cf.ele = $(cf.ele);
                self.write(self.default).show();
                return self;
            },
            dump: db() ? dump : $.noop,
        });
    }

    return Message;
});
/*




 */
