/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-11

 USE
 ...

 TODO
 ...
 */

define(['jquery', 'lodash', 'xtn'], function
    KLASS($, _, xtn) { // closure
    'use strict';

// CLASS
    var Nom = 'Letter';
    var Self = xtn(Letter);
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Df = {
        ele: '',
        gap: 0,
        letter: 'x',
        type: '',
    };

// PRIVATE


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
        toString: Self.dump,
        valueOf: Self.dump,
        letter: function (str) {
            var cf = Self.Cf(this);
            if (typeof str === 'string') {
                cf.letter = str[0];
                return this;
            } else {
                return cf.letter;
            }
        },
        gap: function (num) {
            var cf = Self.Cf(this);
            if (typeof num === 'number') {
                cf.gap = Math.abs(num);
                return this;
            } else {
                return cf.gap;
            }
        },
        type: function (str) {
            var cf = Self.Cf(this);
            if (typeof str === 'string') {
                cf.type = str;
                return this;
            } else {
                return cf.ele.attr('class');
            }
        },
        displayXfor: function (str, num) {
            var cf = Self.Cf(this);
            var ele = cf.ele;
            var org = cf.letter;

            ele.addClass('bad');//.html(str);

            _.delay(function () {
                ele.removeClass('bad').html(org);
            }, num || 3e3);
        },
        tweakWidth: function (max) {
            var cf = Self.Cf(this);
            var px;
            if (cf.ele.outerWidth() + 1 < max) {
                px = parseInt(cf.ele.css('padding-right'), 10);
                cf.ele.css({
                    paddingLeft: px + 1 + 'px',
                    paddingRight: px + 1 + 'px',
                });
            }
        },
        element: function () {
            var cf = Self.Cf(this);
            var ele = cf.ele;

            if (ele) {
                return ele;
            } else {
                // make and datafy
                ele = $('<span>');
                ele.html(cf.letter) //
                    .data(Nom, this) //
                    .addClass(cf.type);
                if (cf.gap) {
                    ele.addClass('space');
                }
                if (ele.is('.tile')) {
                    ele.attr('tabIndex', 0);
                }
                return cf.ele = ele;
            }
        },
        solve: function () {
            var cf = Self.Cf(this);
            var ele = cf.ele;
            ele.addClass('solved').removeClass('unsolved bad now');
        },
        check: function (str) {
            var cf = Self.Cf(this);
            this.displayXfor(str, 999);
            return (str === cf.letter);
        },
    };

// CONSTRUCT
    function Letter(cf) {
        var self = this;

        cf = $.extend({}, Df, cf);

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        cf = Self.cacheConfigs(self, cf);
        self.letter(cf.letter);
        self.gap(cf.gap);
    }

    return Letter;
});
/*



 */
