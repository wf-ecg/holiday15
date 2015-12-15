/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
    'use strict';
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    var panelRatio = 0.84;

    if (W.navigator.userAgent.match(/trident/i)) {
        $('label').one('click', function () {
            $(this).find('input').click().trigger('change');
        });
    }

// Set close gradient classes on form panels
    function updatePanelClasses() {
        var panels = $('.panel');
        var newIndex = $('.panel-collapse').index($('.panel-collapse.in'));

        //drop old close-classes
        panels.removeClass('active');
        panels.removeClass(function (idx, css) {
            return (css.match(/(^|\s)close-\d+/g) || []).join(' ');
        });

        //add active to current panel
        panels.eq(newIndex).addClass('active');

        // add close-# classes to control gradient fade
        panels.each(function (panelIndex) {
            $(this).addClass('close-' + Math.abs(panelIndex - newIndex));
        });
    }

// Set active indicator on progress indicator
    function updateProgressButtons() {
        var panels = $('.panel');
        var buttons = $('.progress-button');
        var newIndex;

        //set answered flags on nav buttons
        panels.each(function (idx) {
            if ($(this).find('input:checked').length) {
                buttons.eq(idx).addClass('answered');
            } else {
                buttons.eq(idx).removeClass('answered');
            }
        });

        newIndex = $('.panel-collapse').index($('.panel-collapse.in'));

        buttons.removeClass('active');
        buttons.eq(newIndex).addClass('active');
    }

    function advancePanel() {
        var current = $('.panel-collapse.in');

        current.find('.quiz-next').trigger('click');
    }

    function focusPanel() {
        var current = $('.panel-collapse.in h2');

        current.attr('tabIndex', -1).focus();
    }

    $(function () {
        var progressHeight = 20;

        function quizInit() {
            var panels, vwidth, panelheight, vheight, bodyheight, progressCenter;

            panels = $('.panel');
            vwidth = $(W).width();

            if (vwidth < 768) {
                panelheight = 0;
                vheight = W.innerHeight;
            } else {
                panelheight = 0;
                vheight = $(W).height();
            }
            bodyheight = vheight - (panels.length * panelheight) + panelheight;
            progressCenter = (panels.length) / 2 * progressHeight;

            // Set the height of the panel to fil the screen, assuming a 10 pixel ribbon
            $('.panel-body').height(bodyheight * panelRatio);
            // Center the indicators
            $('.progress-indicators').css('margin-top', '-' + progressCenter + 'px');
        }

        quizInit();
        updatePanelClasses();

        //update certain display setting whenever collapse events occur
        $('#quiz-group').on('shown.bs.collapse', function () {
            updateProgressButtons();
            updatePanelClasses();
        });

        function displayCase() {
            var ponies, rand, name, nom;

            ponies = ['celebrate', 'pumpkinxmas', 'sweater'];
            rand = Math.floor((Math.random() * ponies.length)); // returns a random number between 1 and x
            name = ponies[rand];
            nom = name;

            function writeIt(a, b, c) {
                $('#pn').html(a);
                $('#pnBio').html(b);
                $('#pnIcon').html(c + ' class="header-image-winner" alt="winner">');
            }

            switch (nom) {
                case 'celebrate':
                    writeIt('Loyal',
                        'You take one holiday at a time!',
                        '<img src="./images/options/celebrate.svg"');
                    break;
                case 'pumpkinxmas':
                    writeIt('Premier',
                        'Way to go! You Deck the Halls the Day after Halloween.',
                        '<img src="./images/options/pumpkinxmas.svg"');
                    break;
                case 'sweater':
                    writeIt('Star',
                        'There’s No Such Thing as an Ugly Holiday Sweater to you!',
                        '<img src="./images/options/sweater.svg"');
                    break;
            }

            $.publish('Winner');
        }

        $('#myQuiz input').change(function () {
            //advance to next Question
            advancePanel();
            focusPanel();

        });

        $('#newQuiz').click(function () {
            W.location.reload();
        });

        $('.filler').click(function () {
            var target = $(this).parent().find('input');

            target.prop('checked', true);
            target.change();
        });

        $('#question-8 .responses').one('click', 'input:radio', function () {
            var bodyheight, panels, panelheight, vheight, vwidth;

            $('#myQuiz').removeClass('visible').addClass('hidden');
            $('#results-container').removeClass('hidden').addClass('visible');

            panels = $('.panel');
            vwidth = $(W).width();

            if (vwidth < 768) {
                panelheight = 0;
                vheight = W.innerHeight;
            } else {
                panelheight = 0;
                vheight = $(W).height();
            }
            bodyheight = vheight - (panels.length * panelheight) + panelheight;

            // Set the height of the panel to fil the screen, assuming a 10 pixel ribbon
            $('.panel-body').height(bodyheight * panelRatio);

            displayCase();
        });

    });

});
