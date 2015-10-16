/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10
 */

define(['jumble'], function (Jumble) {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});
    var x = new Jumble('test');

    function compare(a, b) {
        C.log('compare', [a.toString(), b.toString()]);
        return a.toString() === b.toString();
    }

    x.add('def abc');
    x.add('de fab c');

    C.assert(x.init() === undefined);

    x.add('123');

    C.assert(x.init() === "inited");
    C.assert(compare(x.get(0), "def abc"));
    C.assert(compare(x.get(0), "de fab c"));

    try {
        x.get();
        C.assert(false, 'should fail');
    } catch (err) {
        C.debug('should and did fail');
    }

    C.assert(x.reset() === undefined);

    C.assert(compare(x.get(1), "de fab c"));
    C.assert(compare(x.get(0), "def abc"));
    C.assert(compare(x.get(), "123"));

    C.assert(x.verify("test"));

    C.log(x.dump());

});
/*



 */
