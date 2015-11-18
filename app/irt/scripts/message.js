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
            cheers: {
                all: ['great', 'awesome', 'nice', 'going', 'right', 'good', 'yeah', 'sweet', 'ding'],
                great: 'Great job!',
                awesome: 'Awesome!',
                nice: 'Nice work!',
                going: 'Keep going',
                right: 'That’s right.',
                good: 'You’re good.',
                yeah: 'Oh, yeah!',
                sweet: 'Sweet!',
                ding: 'Ding! Ding! Ding!',
            },
            cheer: function (num) {
                var nom, str;

                num = Math.floor(num || (Math.random() * self.cheers.all.length));
                nom = self.cheers.all[num]; // get name of cheer
                str = self.cheers[nom || 'default'];

                self.write('<h1>' + str + '</h1>');
                return self.show();
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
