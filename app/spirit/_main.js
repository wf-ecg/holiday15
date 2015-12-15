/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'quizpanel', 'dialog', 'share'], function
    MAIN($, _, QP, Dialog, Share) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    // - - - - - - - - - - - - - - - - - -
    // EXTEND

    function db(num) {
        return W.debug > (num || 0);
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

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    expose({
        Share: Share,
        QP: QP,
        game: gameMode,
    });

    $.ajaxSetup({// disable caching
        cache: false,
    });

    var dialog = $('.modal .dialog').first();
    var header = $('header').first();
    var pushin = $('.pushin').first();
    var button = header.find('button').first();

    function detachShare(x) {
        if (!x) {
            $('.row-offcanvas').removeClass('active');
            pushin.find('.shareBar ul').appendTo(header.find('.shareBar'));
        } else {
            $('.row-offcanvas').addClass('active');
            header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
        }
    }

    button.click(function () {
        button.toggleClass('collapsed');

        if (button.is('.collapsed')) {
            detachShare(false);
        } else {
            detachShare(true);
        }
    });

    $.watchResize(function () {
        if (!button.is('.collapsed')) {
            button.click();
        }
        gameMode();
    });

    pushin.load('../includes/main_pushin.html .pushin > *', function () {
        $(W).trigger('resize');
    });
    dialog.load('../includes/main_dialog.html .dialog > *', Dialog.bind);

    $.watchInputDevice();
    $.markAgent();

    // - - - - - - - - - - - - - - - - - -
    // WIRING

    function gameMode() {
        if ($('html').is('.mobi')) {
            return;
        }
        button.click();
        $('.frame .row-offcanvas').removeClass('active');
        header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
    }

    function doBindings() {

        $.subscribe('Winner', function () {
            Share.tweak($('#pn').text());
        });
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});
