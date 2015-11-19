/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'videojs', 'modal'], function
    MAIN($, _, videojs, Modal) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 1);
    }
    function expose(obj, log) {
        if (db()) {
            W.Main = Main; // expose for dev
            $.extend(Main, obj);
        }
        if (log) {
            C.info(Nom, 'expose', Main);
        }
    }

//EXTEND
    expose({
        Modal: Modal,
    });
    var header = $('header').first();
    var pushin = $('.pushin').first();
    var footer = $('footer').first();
    var button;

    header.load('../includes/main_header.html header > *', function () {
        button = header.find('button').first();
        button.click(function () {
            $('.row-offcanvas').toggleClass('active');
            button.toggleClass('collapsed');

            if (button.is('.collapsed')) {
                pushin.find('.shareBar ul').appendTo(header.find('.shareBar'));
            } else {
                header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
            }

        });
    });
    pushin.load('../includes/main_pushin.html .pushin > *');
    footer.load('../includes/main_footer.html footer > *');

    $.watchInputDevice();
    $.markDesktop();

//  PRIVATE
    function pausevids() { // pause everything
        $.each(videojs.players, function () {
            this.pause();
        });
    }

    function playvid(data) {
        videojs(data.target.find('video')[0]).play();
    }

    function doBindings() {
        Modal.init('.ui-page > .modal');
        Modal.bind('.glyphicon-play-circle', '#Video1');
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});
