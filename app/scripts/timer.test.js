/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10
 */

define(['timer'], function (Timer) {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});

    function compare(a, b) {
        C.log('compare', [a.toString(), b.toString()]);
        return a.toString() === b.toString();
    }

    function test1(cf) {
        var x = new Timer(cf);

        C.group(x);
        C.groupEnd();

        x.start();
    }

    test1({time: 3});
    test1({time: 5});
});
/*



 */
