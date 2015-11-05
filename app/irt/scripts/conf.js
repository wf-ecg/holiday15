/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-11

 USE
 ...

 TODO
 ...
 */

define(['jquery'], function
    KLASS($) { // closure
    'use strict';

// CLASS
    var Nom = 'Conf';
    var Self = Conf;
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    var dump = function () {
        return JSON.stringify(this);
    };
// STATIC
    Conf.make = function (str) {
        var arr = str.split(''),
            gap = 0,
            rez;
        return $.map(arr, function (letter) {
            if (letter === ' ') {
                gap = 1;
                rez = undefined;
            } else {
                rez = new Self({letter: letter, gap: gap});
                gap = 0;
            }
            return rez;
        });
    };
    Conf.prototype = {
        constructor: Self,
        toString: dump,
        valueOf: dump,
    };

// CONSTRUCT
    function Conf(cf) {
        var self = this;

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        $.extend(self, cf);
    }

    return Conf;
});
/*



 */
