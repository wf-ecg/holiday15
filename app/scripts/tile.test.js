/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10
 */

define(['tile'], function (Tile) {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});

    function compare(a, b) {
        C.log('compare', [a.toString(), b.toString()]);
        return a.toString() === b.toString();
    }

    function test1() {
        var x = new Tile('test');

        C.group(x);

        C.log(x.dump());
        C.groupEnd();
    }

    test1();
});
/*



 */
