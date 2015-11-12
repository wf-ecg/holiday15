/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-11

 USE
 ...

 TODO
 ...
 */

define(['jquery', 'lodash', 'data', 'letter', 'xtn'], function
    KLASS($, _, Data, Letter, xtn) { // closure
    'use strict';

// CLASS
    var Nom = 'Game';
    var Self = xtn(Game);
    var W = (W && W.window || window),
        C = (W.C || W.console || {});
    var Df = {
    };
    var El = {
        game: '.game',
        input: '.gameInput',
        output: '.gameOutput',
    };

// PRIVATE
    var pair, tiles, slots, nowO, nowE;
    var ACT = 'keypress click';

// CONSTRUCT
    function Game(cf) {
        var self = this;

        cf = $.extend({}, Df, cf);

        if (self.constructor !== Self) {
            throw new Error('not a constructor call');
        }
        cf = Self.cacheConfigs(self, cf);

        // - - - - - - - - - - - - - - - - - -
        // EVENTS
        function checkSlot(tryO) {
            var tryL = tryO.letter();

            if (nowO.check(tryL)) {
                $.unsubscribe('check.Tile');
                nowO.solve();
                tryO.element() //
                    .off(ACT) //
                    .addClass('used') //
                    .removeClass('unused');
                loop();
            }
        }
        function setNow() {
            // make now highlighted
            nowE = $('.slot.unsolved').first();
            nowE.addClass('now');
            nowO = nowE.data('Letter');
            return nowE;
        }

        function loop() {
            if (!setNow().length) {
                El.output.addClass('won');
                oneSolved(startGame);
            }
            $.subscribe('check.Tile', function (e, o) {
                checkSlot(o);
            });
        }

        function startGame() {
            clearGame();
            pair = Data.get();
            tiles = Letter.assemble(pair.anagram.toUpperCase());
            slots = Letter.assemble(pair.correct.toUpperCase());
            $.publish('expose.Main', {
                Data: Data,
                gameslots: slots,
                gametiles: tiles,
                wordpair: pair,
            });

            //kickoff loop
            fillDisplays();
            loop();
        }

        function clearGame() {
            El.input.empty();
            El.output.removeClass('won').empty();
        }

        // - - - - - - - - - - - - - - - - - -
        // MISC
        function fixWidths() {
            var arr = [].concat(slots, tiles);
            var all = arr.map(function (e) {
                return e.element().outerWidth();
            }).sort();
            var max = all[all.length - 1];

            if (all[0] + 10 > max) {
                return W.clearTimeout(fixWidths.timer);
            } else {
                fixWidths.timer = W.setTimeout(fixWidths, 14);
            }

            if (Self.db(2))
                C.log(Nom, 'fixWidths', all);
            arr.forEach(function (e) {
                e.tweakWidth(max - 5);
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // WIRING
        function clickLetter(str) {
            var arr = tiles.concat(), idx;

            arr = arr.filter(function (e) {
                return e.element().is('.unused');
            });
            idx = arr.map(function (e) {
                return e.letter();
            });
            if (Self.db(2))
                C.log(idx, arr);

            idx = idx.indexOf(str);
            if (Self.db(2))
                C.log(idx, str);

            if (idx > -1)
                arr[idx].element().click();
        }

        function wireTile() {
            var self = this;

            self.element().on(ACT, function (evt) {
                var key = evt.keyCode;

                if (key && (key !== 32 && key !== 13))
                    return; // accept `space` and `enter`

                $.publish('check.Tile', self);
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // SHOW/HIDE
        function fillDisplays() {
            fillDisplay(slots, 'slot unsolved', El.output);
            fillDisplay(tiles, 'tile unused', El.input);

            $.each(tiles, wireTile);
            fixWidths();
        }

        function fillDisplay(arr, css, sel) {
            var div = $(sel).hide().fadeIn(999);

            $.each(arr, function () {
                var ele = this.type(css) // classify
                    .element().appendTo(div); // generate
                if (ele.is('.space')) {
                    ele.before(' ');
                }
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // SCORE/TIME
        function oneSolved(cb) {
            $.publish('win.Game');
            $('.jumble').css({
                position: 'relative',
            }).animate({
                left: 3333,
            }, 333, function () {
                $('.jumble').css({
                    left: 0,
                    position: 'static',
                });
                if (typeof cb === 'function')
                    cb();
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // INIT
        function doBindings() {
            El = $.reify(El);

            El.game.on(ACT, function (evt) {
                var key = evt.keyCode;

                if (evt.type === 'keypress') {
                    clickLetter(String.fromCharCode(key).toUpperCase());
                    El.game.focus();
                }
            });

        }

        self.start = startGame;
        doBindings();
    }

    return Game;
});

/*



 */
