/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'modal'], function
    MAIN($, _, Modal) {
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
    function swapper() {
        if ($(W).width() > 992) {
            $('.tile.magic').prependTo('.masonry-container');
        } else {
            $('.tile.magic').appendTo('.masonry-container');
        }
    }

//EXTEND
    expose({
        Modal: Modal,
    });

    $.ajaxSetup ({ // disable caching
        cache: false,
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
        $.watchResize(function () {
            if (!button.is('.collapsed')) {
                button.click();
            }
        });
    });

    pushin.load('../includes/main_pushin.html .pushin > *');
    footer.load('../includes/main_footer.html footer > *');

    $.watchInputDevice();
    $.markAgent();

//  PRIVATE
    function doBindings() {
        Modal.init('.ui-page > .modal');
        Modal.bind('#videoPony', '.ponyVideo', function () {
            $('.modal').find('iframe').attr('src', 'https://www.youtube.com/embed/F6yB2mWCQZI?autoplay=1&rel=0&showinfo=0');
        }, function () {
            $('.modal').find('iframe').attr('src', '');
        });
        $('.tile').on('mouseup', function (evt) {
            var a = $(evt.delegateTarget).find('a')[0];
            a && a.click();
        });
        $(W).on('resize', swapper);
        swapper();
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});
