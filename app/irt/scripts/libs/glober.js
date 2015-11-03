/*jslint white:false, laxcomma:true */
/*globals define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-11

 USE
 single use
 detect and report non-native global additions

 TODO
 document a bit

 */
(function(scope) {
    var i, j, map, n, keys,
        clog = Object.create(null);
    j = 0;
    map = {};
    keys = Object.keys(scope);
    for (i = 0, n = keys.length; i < n; ++i) map[keys[i]] = 1;

    (function update() {
        var name,
            log = Object.create(null),
            current = Object.keys(scope);
        for (i = 0, n = current.length; i < n; ++i) {
            name = current[i];
            // compare lists and find the differences
            if (!(name in map)) {
                log[name] = scope[name];
                map[name] = 1;
            }
        }
        clog['GLOB@' + j] = log;
        if (j && scope.debug > 1) console.info('Glober', clog);
        window.setTimeout(update, Math.pow(10, ++j));
    })();
})(window);
