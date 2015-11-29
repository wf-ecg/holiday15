/*jslint white:false, laxcomma:true */
/*global W, define, FastClick */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'page', 'slides'], function
    MAIN($, _, Page, Slides) {
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
        Page: Page,
        Slides: Slides,
    });

    $.ajaxSetup ({ // disable caching
        cache: false,
    });

    var header = $('header').first();
    var pushin = $('.pushin').first();
    var footer = $('footer').first();
    var button;

    header.load('../includes/snowman_header.html header > *', function () {
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
    function hideStartScreen() {
        $('#Welcome').removeClass('visible').addClass('hidden');
        $('#Game').removeClass('hidden').addClass('visible');
    }

    function showStartScreen() {
        $('#Welcome').removeClass('hidden').addClass('visible');
        $('#Game').removeClass('visible').addClass('hidden');
    }

    function showGame() {
        $('#Welcome').removeClass('visible').addClass('hidden');
        $('#Game').removeClass('hidden').addClass('visible');
    }

    function hashchange() {
        if (W.location.hash.length < 2) {
            W.location.reload();
        } else {
            W.location.reload();
        }
    }

    function doBindings() {
        var mode = Page.getMode();

        Page.reset(function () {
            Page.reSource($('[data-src]'));
            $('.loader').fadeOut(999);
            Slides.init($);
            Slides.makeLink(false); // <--- needed?
        });

        /// EVENTS

        $('a.closeLink').first().click(function (e) {
            Slides.closePreview();
            e.preventDefault();
        });

        $('body').on('keydown', function (evt) {
            if (evt.keyCode === 27) {
                Slides.closePreview();
            }
        });

        $("#btnStart").click(function () {
            showGame();
        });

        /// MODES

        mode = mode > 0 ? mode : 0;
        $('body').addClass('mode' + mode);
        $('.greeting').show();

        if (mode > 0) {
            $('.create').show();

            switch (mode) {
                case 0:
                    showStartScreen();
                    break;
                case 1:
                    hideStartScreen();
                    $('.charity').show();
                    break;
                case 3:
                    //$('body').toggleClass('wells wystar');
            }
        } else {
            $('.shared').show();
            $('.create, .arrow').remove();
        }

        $(W).on('hashchange', hashchange);

        FastClick.attach(W.document.body);

        $('.shareBar').first().load('../includes/snowman_share.html .shareBar > *');
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});

/*




 */
