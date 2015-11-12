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
            return $(this).position();
        });
        return this.each(function (i, e) {
            $(e).css(poses[i]);
        }).addClass('freeze');
    };
    $.fn.unfreeze = function () {
        return this.css({top: '', left: ''}).removeClass('freeze');
    };
    $.fn.freezeKids = function () {
        this.css({height: this.height(), width: this.width()});
        this.children().freeze();
        return this;
    };
    $.fn.unfreezeKids = function () {
        this.css({height: '', width: ''});
        this.children().unfreeze();
        return this;
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
    $.watchResize = function (fn) {
        $(W).off('resize.Util');
        if (fn) {
            $.watchResize.last = fn;
            $(W).on('resize.Util', fn);
            fn();
        }
    };
    $.swallowBackspace = function () {
        $(W.document).on('keydown', function (evt) {
            var ele = $(evt.target || evt.srcElement);
            if (evt.keyCode === 8 && !ele.is('input,[contenteditable="true"],textarea')) {
                evt.preventDefault();
            }
        });
    };

});
/*



 */
