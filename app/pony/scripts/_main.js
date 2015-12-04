/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'quizpanel', 'modal', 'share'], function
    MAIN($, _, QP, Modal, Share) {
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
        Modal: Modal,
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
    function bindDialog() { // off site dialog
        var dialog = $('.modal .dialog'); // thing to show
        var triggers = $('.shareBar .shares a'); // intercept these

        Modal.bind(triggers, dialog, function (data) {
            var btn = dialog.find('.utilitybtn'); // find the go button
            var src = data.source[0];

            if (src.target) {
                btn.attr('target', src.target); // transfer target
            }
            btn.attr('href', src.href); // transfer url
            btn.on('click', Modal.hide);
        });
    }

    function doBindings() {
        Modal.init('.ui-page > .modal');

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
