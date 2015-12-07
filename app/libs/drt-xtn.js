/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'lodash'], function
    KLASS($, _) { // closure
    'use strict';

    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    var cache = {};

    return function (Self) {

        Self.Cf = function (cf) {
            var id = Math.random() * 1e20; // ensure whole number and zeros

            if (cf.constructor === Self) {
                return cache[cf['.cf']];
            } else {
                while(cache[id]) id++; // prevent collision
                cf['#'] = id;
                return (cache[id] = cf);
            }
        };

        Self.cacheConfigs = function (self, cf) {
            cf = Self.Cf(cf); // nab a private property
            if (Self.db()) { // expose if debugging
                Self.cache = cache;
                self.cf = cf;
            }
            self['.cf'] = cf['#']; // keep a cache key
            return cf;
        };

        Self.db = function (num) {
            return W.debug > (num || 1);
        };

        Self.dump = function () {
            return JSON.stringify(this);
        };

        return Self;
    };
});

/*



 */
