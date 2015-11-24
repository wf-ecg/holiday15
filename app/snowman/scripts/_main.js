/*jslint white:false, laxcomma:true */
/*global W, define, FastClick */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'page', 'slides', 'smartResize'], function
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
        var mode = Page.getMode();

        FastClick.attach(W.document.body);
        Page.reset(function () {
            Page.reSource($('[data-src]'));
            $('.loader').fadeOut(999);
            Slides.init(W.jQuery);
            //Slides.makeLink(false); <--- needed?
        });

        /// EVENTS

        $('a.closeLink').first().click(function (e) {
            Slides.closePreview();
            e.preventDefault();
        });
        $('body').on('keydown', function (evt) {
            //C.debug('keydown', evt.keyCode);
            if (evt.keyCode === 27) {
                Slides.closePreview();
            }
        });

        /// MODES

        mode = mode > 0 ? mode : 0;
        $('body').addClass('mode' + mode);
        $('.greeting').show();

        if (mode > 0) {

            $('.create').show();

            switch (mode) {
                case 0:
                    break;
                case 2:
                    $('.charity').show();
                    break;
                case 3:
                    //$('body').toggleClass('wells wystar');
            }
        } else {
            $('.shared').show();
            $('.create, .arrow').remove();
        }


        /// misc.js

        function hideStartScreen() {
            $('#welcome').removeClass('visible').addClass('hidden');
            $('.stagecoach-footer').removeClass('visible').addClass('hidden');
            $('#game').removeClass('hidden').addClass('visible');
        }

        function showStartScreen() {
            $('#welcome').removeClass('hidden').addClass('visible');
            $('#stageCoach').removeClass('hidden').addClass('visible');
            $('#game').removeClass('visible').addClass('hidden');
        }

        $("#btnStart").click(function () {
            showGame();
        });

        function showGame() {
            $('#welcome').removeClass('visible').addClass('hidden');
            $('#stageCoach').removeClass('visible').addClass('hidden');
            $('#game').removeClass('hidden').addClass('visible');
        }


        /// watchWindowHash.js

        $(W).bind('hashchange', function (e) {
            var hashwith = '';

            if (W.location.hash === '') {
                W.location.hash = '';
                W.document.title = 'Snowman Scramble';

                showStartScreen();
            } else {
                W.location.hash = W.location.hash.substring(1);
                W.document.title = 'View my snowman';

                hideStartScreen();
            }
        });

        $(W).trigger('hashchange');



    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);

        doBindings();
    });

});

/*




 */
