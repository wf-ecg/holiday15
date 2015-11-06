/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

define(['jquery', 'lodash'], function ($, _) {
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    $.swapper = function (arr, lf, rt) {
        var tmp = arr[lf];
        arr[lf] = arr[rt];
        arr[rt] = tmp;
    };

    $.shuffler = function (array) {
        var arr = array.concat(),
            rem = arr.length,
            swap = function (a, b, c) {
                $.swapper(arr, a, b);
            };
        while (rem--) {
            swap(rem, Math.floor(Math.random() * (rem + 1)));
        }
        return arr;
    };

});
/*



 */
