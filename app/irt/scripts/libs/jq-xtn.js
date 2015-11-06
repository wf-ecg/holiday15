/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    $.altTitles = function () {
        $('*').each(function () {
            var me = $(this);
            me.attr('title', me.attr('alt'));
        });
    };

    $.watchResize = function (fn) {
        if (fn) {
            $.watchResize.last = fn;
            $(W).on('resize', fn);
            fn();
        } else {
            $(W).off('resize', watchResize.last);
        }
    };

});
/*



 */
