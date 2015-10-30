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
            finish: '<h1>Scroll to play again</h1>',
            going: '<h1>Keep going!</h1>',
            intro: '<h1>Scroll to play</h1>',
            right: '<h1>That’s right...</h1>',
            show: function (prop, cb) {
                cf.ele.hide() //
                .html(this[prop]) //
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
