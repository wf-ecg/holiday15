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
        prefix: 'Time ',
        div: '#Timer',
        bottom: 0,
        cb: function () {
            C.info(Nom, 'done');
        },
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Timer(cf) {
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
        function tick() {
            self.update();
            if (cf.time <= cf.bottom) {
                self.finish();
            } else {
                if (cf.time <= 0) {
                    self.over();
                }
                cf.time--;
                cf.timeout = W.setTimeout(tick, 1e3);
            }
        }
        function format() {
            var min, sec, time = Math.abs(cf.time);

            sec = ('00' + time % 60).slice(-2);
            min = Math.floor(time / 60) || '';

            return cf.prefix + min + ':' + sec;
        }
        function dump() {
            self._ = JSON.stringify(cf)
                .replace(/,/g, '", ') // kill quotes
                .replace(/\"/g, '');
            return self;
        }
        function display() {
            var txt = format();

            if (db(2)) {
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
            over: function () {
                cf.div.addClass('over');
            },
            timeLeft: function () {
                return cf.time - cf.bottom;
            },
            start: function () {
                cf.div.removeClass('stopped').addClass('started');
                tick();
                return self;
            },
            stop: function () {
                cf.div.addClass('stopped').removeClass('started');
                W.clearTimeout(cf.timeout);
            },
            update: function () {
                self.display();
            },
            force: function (txt) {
                cf.div.html(txt);
                return cf.div;
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
