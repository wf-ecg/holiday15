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
        linger: 7777,
    };
    var El = {
        game: '.game',
        input: '.gameInput',
        jumble: '.jumble',
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
                nowO.solved();
                tryO.used() //
                    .ele().off(ACT);
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
                El.jumble.addClass('won');
                oneSolved(nextPuzzle);
            }
            $.subscribe('check.Tile', function (evt, obj) {
                checkSlot(obj);
            });
        }

        function nextPuzzle() {
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
            El.jumble.removeClass('won');
            El.output.empty();
        }

        // - - - - - - - - - - - - - - - - - -
        // MISC
        function fixWidths() {
            var arr, all, max;

            arr = [].concat(slots, tiles);
            all = arr.map(function (e) {
                return e.ele().outerWidth();
            }).sort();
            max = all[all.length - 1];

            if (all[0] + 10 > max) {
                return W.clearTimeout(fixWidths.timer);
            } else {
                fixWidths.timer = W.setTimeout(fixWidths, 14);
            }

            if (Self.db(2)) {
                C.log(Nom, 'fixWidths', all);
            }
            arr.forEach(function (e) {
                e.tweakWidth(max - 5);
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // WIRING
        function clickLetter(str) {
            var arr, idx;

            if (!tiles || !tiles.length || !str) {
                return;
            }

            arr = tiles.concat() //
                .map(function (e) { // make array of unused tiles
                    if (e.ele().is('.unused')) {
                        return e.letter(); // reduce to just a letter
                    }
                });
            idx = arr.indexOf(str); // is str in there?

            if (idx > -1) {
                tiles[idx].ele().click(); // sudo-click it!
            }
        }

        function wireTile() { // accept ada type input
            var self = this;

            self.ele().on(ACT, function (evt) {
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
                    .ele().appendTo(div); // generate
                if (ele.is('.space')) {
                    ele.before(' ');
                }
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // SCORE/TIME
        function oneSolved(cb) {
            var arr;

            $.publish('win.' + Nom);
            arr = $.shuffler(slots);

            (function fn() {
                var slot = arr.pop();
                if (slot) {
                    slot.ele().addClass('now');
                    W.setTimeout(fn, cf.linger / 50);
                }
            }());

            El.input.fadeOut(cf.linger, function () {
                El.input.show();
                $.publish('next.Game');
                (typeof cb !== 'function') || cb();
            });
        }

        // - - - - - - - - - - - - - - - - - -
        // INIT
        function doBindings() {
            El = $.reify(El);

            $(W).on(ACT, function (evt) { // allow keyboard users to fly
                var key = evt.keyCode;

                if (evt.type === 'keypress') {
                    clickLetter(String.fromCharCode(key).toUpperCase());
                }
            });
        }

        function init() {
            Data.reload();
            nextPuzzle();
        }

        doBindings();
        self.start = init;
    }

    return Game;
});

/*



 */
