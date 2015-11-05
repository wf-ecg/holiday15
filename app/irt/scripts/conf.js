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
    Conf.assemble = function (str) {
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
        letter: function (str) {
            if (typeof str === 'string') {
                this._letter = str[0];
                return this;
            } else {
                return this._letter;
            }
        },
        gap: function (num) {
            if (typeof num === 'number') {
                this._gap = Math.abs(num);
                return this;
            } else {
                return this._gap;
            }
        },
        type: function (str) {
            if (typeof str === 'string') {
                this._type = str;
                return this;
            } else {
                return this._type;
            }
        },
        genEle: function () {
            // make a div and put data on it
            var ele = $('<span>');

            ele.html(this._letter) //
                .data(Nom, this) //
                .addClass(this._type);
            if (this._gap) {
                ele.addClass('space');
            }
            return ele;
        },
        check: function (str) {
            return (str === this._letter);
        },
        pushTo: function (obj) {
            // error if obj is not a Conf or not a Slot
            // attempts to choose pushes letter to another object
            //      calls a check from the object
            // there can be a push to the now slot (but it can't accept--- not my letter)
            // object can accept the check by returning boolean
            // if push is true, make self "used"
            // if i am used then deactivate selection actions
        },
    };

// CONSTRUCT
    function Conf(cf) {
        var self = this;

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        self.cf = $.extend({
            gap: 0,
            letter: 'x',
            type: '',
        }, cf);

        self.letter(cf.letter);
        self.gap(cf.gap);
    }

    return Conf;
});
/*



 */
