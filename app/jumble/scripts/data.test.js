/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10
 */

define(['data'], function (Data) {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});

    function reduce(str) {
        return str.replace(/\ /g, '');
    }

    function test1() {
        var data = Data.anagrams.concat();

        data.forEach(function (e, i) {
            var len = reduce(e[0]).length;

            e.forEach(function (e, i) {
                if (len !== reduce(e).length) {
                    C.error(e, i);
                }
            });
        });

    }

    test1();
});
/*



 */
