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
        time: 0,
    };

    function db(num) {
        return W.debug > (num || 1);
    }

// CONSTRUCT
    function Timer(num, cf) {
        var self = this;

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        if (!num) {
            throw new Error('no initial num');
        }
/// INSTANCE
        cf = $.extend(true, {
            time: num,
        }, Df, cf);

/// METHODS

/// API
        $.extend(self, {
            finish: function () {
                alert('done');
            },
            start: function (num, cb) {
                this.set(num || 15);
                if (cb) {
                    this.finish = cb;
                }
            },
            stop: function () {

            },
            update: function () {

            },
            tick: function () {
                cf.time--;
                this.update();
                if (cf.time <= 0) {
                    this.stop();

                }
            },
            set: function (num) {
                cf.time = num || 0;
            },
            get: function () {
                return cf.time;
            },
            format: function () {
                var min, sec;
                sec = cf.time % 60;
                min = Math.floor(cf.time / 60) || '';
                return min + ':' + sec;
            },
            display: function () {

            },
        });

/// INIT
        if (db()) {
            C.warn(Nom, self);
        }
    }

    return Timer;
});
/*

 take a phrase
 load anagrams
 display



 */
