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

// ETC
    $.reify = function (x, y) { // jq-reify props w/selector vals
        $.each(x, function (i, e) {
            x[i] = $(e);
        });
        return y ? $.extend(y, x) : x; // extend optional host
    };

    $.altTitles = function () {
        $('*').each(function () {
            var me = $(this);
            me.attr('title', me.attr('alt'));
        });
    };

});
/*



 */
