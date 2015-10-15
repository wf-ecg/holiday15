/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10

 USE
 ...

 TODO
 ...
 */

define(['lodash'], function
    KLASS(_) { // closure
    'use strict';

//  CLASS
    var Nom = 'Jumble';
    var Self = Jumble;
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var db = function (num) {
        return W.debug > (num || 0);
    };

    function random(max) {
        return Math.floor(Math.random() * max);
    }

//CONSTRUCT
    function Jumble(correct) {
        var api, self = this;

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }

///     INSTANCE
        function checkInit() {
            if (!self.isInited)
                throw new Error('not inited');
        }
        function addJumble(str) {
            self._jumbles.push(str);
        }
        function getJumble() {
            var len = self.getLength();
            var num = arguments[0];

            checkInit();

            if (!len) {
                throw new Error('out of jumbles');
            } else if (typeof num !== 'number') {
                num = random(len);
            }
            return self.jumbles.splice(num, 1);
        }

        api = {
            _correct: correct,
            _jumbles: [],
            isInited: false,
            jumbles: false,
            played: false,
            add: addJumble,
            get: getJumble,
            getLength: function () {
                return self.jumbles.length;
            },
            init: function () {
                if (self.isInited) {
                    return 'inited';
                }
                self.reset();
                self.isInited = true;
            },
            reset: function () {
                self.jumbles = self._jumbles.concat();
                self.played = [];
            },
        };

//      INIT
        _.extend(self, api);
        if (db()) {
            C.warn(Nom, self);
        }
    }
    return Jumble;

});
/*



 */
