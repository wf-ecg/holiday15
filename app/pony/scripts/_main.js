/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'quizpanel', 'modal', 'dynashare'], function
    MAIN($, _, QP, Modal, Dynash) {
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
    W.Dynash = Dynash;

    expose({
        Dynash: Dynash,
        Modal: Modal,
        QP: QP,
    });

    $.ajaxSetup ({ // disable caching
        cache: false,
    });

    var header = $('header').first();
    var pushin = $('.pushin').first();
    var footer = $('footer').first();
    var button;

    function detachShare(x) {
        if (!x) {
            pushin.find('.shareBar ul').appendTo(header.find('.shareBar'));
        } else {
            header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
        }
    }

    header.load('../includes/pony_header.html header > *', function () {
        button = header.find('button').first();

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
    });

    pushin.load('../includes/main_pushin.html .pushin > *');
    footer.load('../includes/main_footer.html footer > *');

    $.watchInputDevice();
    $.markAgent();

//  PRIVATE
    function bindDialog() { // off site dialog
        var dialog = $('.modal .dialog'); // thing to show
        var triggers = $('.shareBar .shares a'); // intercept these

        Modal.bind(triggers, dialog, function (data) {
            dialog.find('.utilitybtn') // find the go button
                .attr('href', data.source[0].href); // transfer url
        });
    }

    function doBindings() {
        Modal.init('.ui-page > .modal');
        $('.shareBar:not(#shareBarDynamic)').first().load('../includes/pony_share.html .shareBar > *');
        $('#shareBarDynamic').first().load('../includes/pony_share_dynamic.html #shareBarDynamic > *');
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});
