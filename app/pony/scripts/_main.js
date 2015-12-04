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
    MAIN($, _, QP, bindDialog, Share) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

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

//EXTEND
    expose({
        Share: Share,
        QP: QP,
    });

    $.ajaxSetup({// disable caching
        cache: false,
    });

    var header = $('header').first();
    var pushin = $('.pushin').first();
    var button = header.find('button').first();

    function detachShare(x) {
        if (!x) {
            pushin.find('.shareBar ul').appendTo(header.find('.shareBar'));
        } else {
            header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
        }
    }

    button.click(function () {
        $('.row-offcanvas').toggleClass('active');
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
    });
    bindDialog();

    pushin.load('../includes/main_pushin.html .pushin > *');

    $.watchInputDevice();
    $.markAgent();

//  PRIVATE

    function doBindings() {

        $.subscribe('Ponied', function () {
            Share.tweak($('#pn').text());
        });
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});
