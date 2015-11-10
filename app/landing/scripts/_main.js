/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'videojs', 'modal'], function
    MAIN($, videojs, Modal) {
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
    $('header').first().load('../includes/main_header.html header > *');
    $('footer').first().load('../includes/main_footer.html footer > *');

//  PRIVATE
    function pausevids() { // pause everything
        $.each(videojs.players, function () {
            this.pause();
        });
    }

    function playvid(data) {
        videojs(data.target.find('video')[0]).play();
    }

    function bindVids() {
        Modal.bind('.glyphicon-play-circle', '#Video1', playvid, pausevids);

        if (Main.mobile) {
            $.each(videojs.players, function () {
                this.on('pause', Modal.hide);
            });
        }
    }

//  INIT
    $(function () {
        if (Db) {
            W.main = Main;
            Main.Modal = Modal; // expose for dev
            C.info(Nom, 'init @', new Date(), 'debug:', Db, Main);
        }

        bindVids();
    });

});
