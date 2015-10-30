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
            almost: 'Almost there.',
            finish: 'Scroll to play again',
            going: 'Keep going!',
            intro: 'Scroll to play',
            right: 'That’s right...',
            cheers: ['almost', 'going', 'right'],
            cheer: function (num) {
                num = num || (Math.random() * self.cheers.length);
                self.show(self.cheers[Math.floor(num)]);
            },
            show: function (prop, cb) {
                cf.ele.hide() //
                .html('<h1>' + self[prop] + '</h1>') //
                .fadeIn(cb);
            },
            init: function () {
                cf.ele = $(cf.ele);
            },
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.init();
    }
    return Message;
});
/*




 */
