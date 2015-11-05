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
    var Nom = 'Timer';
    var Self = Timer;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Df = {
        inited: false,
        time: 10,
        prefix: 'Timer ',
        div: '#Timer',
        cb: function () {
            C.info(Nom, 'done');
        },
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Timer(cf) {
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
        function tick() {
            self.update();
            if (cf.time <= 0) {
                self.finish();
                return;
            }
            cf.time--;
            cf.timeout = W.setTimeout(tick, 1e3);
        }
        function format() {
            var min, sec
            ;
            sec = ('00' + cf.time % 60).slice(-2);
            min = Math.floor(cf.time / 60) || '';

            return cf.prefix + min + ':' + sec;
        }
        function dump() {
            self._ = JSON.stringify(cf)
                .replace(/,/g, '", ') // kill quotes
                .replace(/\"/g, '');
            return self;
        }
        function display() {
            var txt = format()
            ;
            if (db()) {
                C.debug(Nom, [cf.div.prevObject.selector], [txt]);
            }
            cf.div.html(txt);
        }
/// API
        $.extend(self, {
            finish: function () {
                self.stop();
                cf.cb();
            },
            add: function (num) {
                cf.time += num;
            },
            bottom: function (num, cb) {
                // not necessarily zero!
                // callback when hit
            },
            start: function () {
                tick();
                return self;
            },
            stop: function () {
                W.clearTimeout(cf.timeout);
            },
            update: function () {
                self.display();
            },
            set: function (num) {
                cf.time = num || 0;
            },
            get: function () {
                return cf.time;
            },
            assign: function (sel) {
                cf.div = $(sel).first();
            },
            display: display,
            dump: db() ? dump : $.noop,
        });

/// INIT
        self.assign(cf.div);
    }
    return Timer;
});
/*



 */
