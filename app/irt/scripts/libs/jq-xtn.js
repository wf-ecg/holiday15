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

});
/*



 */
