/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-11

 USE
 ...

 TODO
 ...
 */

define(['jquery', 'lodash'], function
    KLASS($, _) { // closure
    'use strict';

// CLASS
    var Nom = 'Letter';
    var Self = Letter;
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    var dump = function () {
        return JSON.stringify(this);
    };
// STATIC
    Letter.assemble = function (str) {
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
    Letter.prototype = {
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
        displayXfor: function (str, num) {
            var ele = this._ele;
            var org = this._letter;

            ele.addClass('bad').html(str);

            _.delay(function () {
                ele.removeClass('bad').html(org);
            }, num || 3e3);
        },
        element: function () {
            var ele = this._ele;

            if (ele) {
                return ele;
            } else {
                // make and datafy
                ele = $('<span>');
                ele.html(this._letter) //
                    .data(Nom, this) //
                    .addClass(this._type);
                if (this._gap) {
                    ele.addClass('space');
                }
                return this._ele = ele;
            }
        },
        solve: function () {
            var ele = this._ele;
            ele.addClass('solved').removeClass('unsolved bad now');
        },
        check: function (str) {
            this.displayXfor(str, 999);
            return (str === this._letter);
        },
    };

// CONSTRUCT
    function Letter(cf) {
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

    return Letter;
});
/*



 */
