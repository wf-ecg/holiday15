/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

// AUTOMATE
    $.reify = function (obj) { // replace vals(selectors) with elements
        $.each(obj, function (i, sel) {
            obj[i] = $(sel);
        });
    };

// PUBSUBS
    $.pubsubs = $({});
    $.publish = function () {
        $.pubsubs.trigger.apply($.pubsubs, arguments);
    };
    $.subscribe = function () {
        $.pubsubs.on.apply($.pubsubs, arguments);
    };
    $.unsubscribe = function () {
        $.pubsubs.off.apply($.pubsubs, arguments);
    };
    $.fn.mediate = function (event, limit, topic) {
        return this.on(event, _.debounce(function (evt) {
            $.publish(topic, evt);
        }, limit));
    };

// FREEZE
    $.fn.freeze = function () {
        var poses = this.map(function () {
            return $(this).offset();
        });
        return this.each(function (i, e) {
            $(e).css(poses[i]);
        }).addClass('freeze');
    };
    $.fn.unfreeze = function () {
        return this.css({top: '', left: ''}).removeClass('freeze');
    };
    $.fn.freezeKids = function () {
        return this.css({height: this.height(), width: this.width()}) //
            .children().freeze();
    };
    $.fn.unfreezeKids = function () {
        return this.css({height: '', width: ''}) //
            .children().unfreeze();
    };

// WATCHERS
    $.watchInputDevice = function () {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mousemove', function () {
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    };

});
/*



 */