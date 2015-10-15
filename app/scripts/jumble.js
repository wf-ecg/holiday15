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

//CLASS
    var Nom = 'Jumble';
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 0;

//  PRIVATE
    function random(max) {
        return Math.floor(Math.random() * max);
    }

//CONSTRUCT
    function Jumble(correct) {
        var api;

        this.correct = correct;

///     PUBLIC
        function bindAnything() {
            _bind();
        }

        api = {
            _jumbles: [],
            correct: '',
            played: [],
            isInited: false,
            jumbles: null,
            checkInit: function () {
                if (!this.isInited)
                    throw new Error('not inited');
            },
            addJumble: function (str) {
                this._jumbles.push(str);
            },
            getLength: function () {
                return this.jumbles.length;
            },
            getJumble: function () {
                var len = this.getLength();
                var num = arguments[0];

                this.checkInit();

                if (!len) {
                    throw new Error('out of jumbles');
                } else if (typeof num !== 'number') {
                    num = random(len);
                }
                return this.jumbles.splice(num, 1);
            },
            init: function () {
                if (this.isInited) {
                    return 'inited';
                }
                this.reset();
                this.isInited = true;
            },
            reset: function () {
                this.jumbles = this._jumbles.concat();
                this.played = [];
            },
        };

//      INIT
        _.extend(this, api);
    }

    Jumble.test = function () {
        var x = new Jumble('abc def');

        function compare(a, b) {
            C.log(Nom, 'compare', [a.toString(), b.toString()]);
            return a.toString() === b.toString();
        }

        x.addJumble('def abc');
        x.addJumble('de fab c');
        C.assert(x.init() === undefined);
        x.addJumble('123');
        C.assert(x.init() === "inited");
        C.assert(compare(x.getJumble(0), "def abc"));
        C.assert(compare(x.getJumble(0), "de fab c"));
        try {
            x.getJumble();
            C.assert(false, 'should fail');
        } catch (err) {
            C.debug('should and did fail');
        }
        C.assert(x.reset() === undefined);
        C.assert(compare(x.getJumble(1), "de fab c"));
        C.assert(compare(x.getJumble(0), "def abc"));
        C.assert(compare(x.getJumble(), "123"));

        return x;
    };

    return Jumble;
});
/*



 */
