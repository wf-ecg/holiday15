/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'modal', 'jumble', 'tile', 'timer'], function
    MAIN($, Modal, Jumble, Tile, Timer) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 0;
    var PC = !W.navigator.userAgent.match(/mobi/i);

//EXTEND
    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

//  PRIVATE
    function watchInputDevice() {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mousemove', function () {
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    }

//  INIT
    $(function () {
        if (Db) {
            W.main = Main; // expose for dev
            $.extend(Main, {
                Modal: Modal,
                Jumble: Jumble,
                Tile: Tile,
                Timer: Timer,
            });

            C.info(Nom, 'init @', new Date(), 'debug:', Db, Main);

            //require(['jumble.test']);
            //require(['tile.test']);
            //require(['timer.test']);
        }

        Main.mobile = !PC;
        $.scrollMain(0); // reset page position

        $('a.center').click(function (evt) {
            evt.preventDefault();
            $.scrollMain(333); // just to main area
        });

        watchInputDevice();
    });

});
