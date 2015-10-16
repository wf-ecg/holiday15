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

    function test1() {
        var x = new Timer('test');


        C.log(x);
    }
    test1();
    test1();
});
/*



 */
