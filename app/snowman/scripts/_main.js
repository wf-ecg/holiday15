/*jslint white:false, laxcomma:true */
/*global W, define, FastClick */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'page', 'slides', 'fastclick', 'dialog', 'share'], function
    MAIN($, _, Page, Slides, FastClick, bindDialog, Share) {
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
        Page: Page,
        Share: Share,
        Slides: Slides,
        game: gameMode,
    });
    W.Slides = Slides; // must expose for html bound events

    $.ajaxSetup({// disable caching
        cache: false,
    });

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
    bindDialog(); // external site warning

    pushin.load('../includes/main_pushin.html .pushin > *', function () {
        $(W).trigger('resize');
    });

    $.watchInputDevice();
    $.markAgent();

//  PRIVATE
    function gameMode() {
        if ($('html').is('.mobi')) {
            return;
        }
        button.click();
        $('.frame .row-offcanvas').removeClass('active');
        header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
    }

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

        $('#Snowman-finish').on('click', function () {
            $('#snowmanButton1').hide();
            $('#snowmanButton2').hide();
            $('#snowmanShareBar').show();
            Slides.finish();
        });
        $('#Snowman-scramble').on('click', function () {
            Slides.scramble();
        });
        $('#Snowman-restart').on('click', function () {
            Slides.makeLink(true);
            W.location.reload();
        });

        $.subscribe('Snowed', function (evt, obj) {
            Share.tweak(obj.href);
        });

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

    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});

/*




 */
