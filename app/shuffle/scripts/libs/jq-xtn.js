/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 1;

// PUB SUBS
    var Q = $.pubsubs = $({});

    $.publish = function () { // o.trigger.bind(o)
        Q.trigger.apply(Q, arguments);
    };
    $.subscribe = function () { // o.on.bind(o)
        Q.on.apply(Q, arguments);
    };
    $.unsubscribe = function () { // o.off.bind(o)
        Q.off.apply(Q, arguments);
    };
    $.fn.mediate = function (event, limit, topic) {
        return this.on(event, _.debounce(function (evt) {
            $.publish(topic, evt);
        }, limit));
    };

// NEW

    $.swapper = function (arr, lf, rt) {
        var tmp = arr[lf];
        arr[lf] = arr[rt];
        arr[rt] = tmp;
    };

    $.shuffler = function (array) {
        var arr = array.concat(),
            rem = arr.length,
            swap = function (a, b, c) {
                swapper(arr, a, b);
            };
        while (rem--) {
            swap(rem, Math.floor(Math.random() * (rem + 1)));
        }
        return arr;
    };


    $.fn.freeze = function () {
        var poses = this.map(function () {
            return $(this).offset();
        });
        return this.each(function (i, e) {
            $(e).css(poses[i]);
        }).css({position: 'absolute'});
    };
    $.fn.unfreeze = function () {
        return this.css({top: '', left: '', position: ''});
    };
    $.fn.freezeKids = function () {
        return this.css({height: this.height(), width: this.width()}).find('div').freeze();
    };
    $.fn.unfreezeKids = function () {
        return this.css({height: '', width: ''}).find('div').unfreeze();
    };

});
/*



 */
