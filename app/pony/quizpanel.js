/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery'], function ($) {
    var W, C;

    W = W || window;
    C = C || W.console;

    var panelRatio = 0.84;

    W.navigator.userAgent.match(/trident/i) && $('label').one('click', function () {
        $(this).find('input').click().trigger('change');
    });

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
            var ponies, rand, ponyName, pn;

            ponies = ['eltoro', 'mollie', 'snowflake', 'king', 'nellie', 'buck', 'mack', 'prince', 'dandy', 'billy', 'trixie', 'grace', 'maggie', 'al'];
            rand = Math.floor((Math.random() * ponies.length)); // returns a random number between 1 and x
            ponyName = ponies[rand];
            pn = ponyName;

            function writeIt(a, b, c) {
                $('#pn').html(a);
                $('#pnBio').html(b);
                $('#pnIcon').html(c + ' class="header-image-winner" alt="pony">');
            }

            switch (pn) {
                case 'eltoro':
                    writeIt('El Toro',
                        '‘The Bull’ worked in Wells&nbsp;Fargo’s Mexico City headquarters. ' +
                        'At 27 years of age, he was oldest horse in the stables and only worked a few hours a week to keep him&nbsp;limber.',
                        '<img src="./images/icons/pony/eltoro.svg"');
                    break;
                case 'mollie':
                    writeIt('Mollie',
                        'A beautiful white mare that led the stagecoach team that brought stagecoach President Hayes to Roseburg, ' +
                        'Oregon, narrowly missing a run-in with the notorious bandit, Black&nbsp;Bart.',
                        '<img src="./images/icons/pony/mollie.svg"');
                    break;
                case 'snowflake':
                    writeIt('Snowflake',
                        'A pristine white horse, Snowflake lived in New Jersey and rode a ferry across the Hudson ' +
                        'every morning to pull a wagon throughout&nbsp;Manhattan. ',
                        '<img src="./images/icons/pony/snowflake.svg"');
                    break;
                case 'king':
                    writeIt('King',
                        'A black horse, King faithfully served Wells&nbsp;Fargo in Las Vegas, New Mexico, and Los&nbsp;Angeles.',
                        '<img src="./images/icons/pony/king.svg"');
                    break;
                case 'nellie':
                    writeIt('Nellie',
                        'With blazing speed, Nellie helped get her driver’s sick brother to a doctor and then finished her Wells&nbsp;Fargo&nbsp;route.',
                        '<img src="./images/icons/pony/nellie.svg"');
                    break;
                case 'buck':
                    writeIt('Buck',
                        'Handsome Buck started working for Wells&nbsp;Fargo in 1900 in Ardmore Oklahoma Territory.' +
                        'While he wasn’t the largest horse in the stable, Buck could pull a fully-loaded express wagon all by&nbsp;himself.',
                        '<img src="./images/icons/pony/buck.svg"');
                    break;
                case 'mack':
                    writeIt('Mack',
                        'One of the most beloved horses that ever worked for Wells&nbsp;Fargo, the chestnut-colored Mack ' +
                        'pulled a stagecoach on the Pioneer Stage Line from Placerville, California to Carson City,&nbsp;Nevada.',
                        '<img src="./images/icons/pony/mack.svg"');
                    break;
                case 'prince':
                    writeIt('Prince',
                        'A striking gray horse that got his name because he was the most handsome horse in Ardmore, ' +
                        'Oklahoma Territory stables and because he cost the princely sum of&nbsp;$125.',
                        '<img src="./images/icons/pony/prince.svg"');
                    break;
                case 'dandy':
                    writeIt('Dandy',
                        'A big bay horse with a white mane, Dandy was one of the most valuable and expensive horses in 1895 Auburn, California. ' +
                        'Wells&nbsp;Fargo paid $18 – top dollar in those days – to get&nbsp;him.',
                        '<img src="./images/icons/pony/dandy.svg"');
                    break;
                case 'billy':
                    writeIt('Billy',
                        'A trusty Appaloosa and an early media star featured in the February 1914 issue of the Wells&nbsp;Fargo&nbsp;Messenger.',
                        '<img src="./images/icons/pony/billy.svg"');
                    break;
                case 'trixie':
                    writeIt('Trixie',
                        'A fine brown and white Paint, Trixie was born and raised in Ardmore, Oklahoma Territory and started ' +
                        'working for Wells&nbsp;Fargo in 1918, often donning a wool blanket in the winter months to stay&nbsp;warm.',
                        '<img src="./images/icons/pony/trixie.svg"');
                    break;
                case 'grace':
                    writeIt('Grace',
                        'Had a reputation for delivering customers express shipments in Los Angeles with a dignified manner and was ' +
                        'one of the last ponies to ever work for Wells&nbsp;Fargo.',
                        '<img src="./images/icons/pony/grace.svg"');
                    break;
                case 'maggie':
                    writeIt('Maggie',
                        'A brown mare with over 20 years service that represented Wells&nbsp;Fargo in the first annual San Francisco Work Horse Parade in&nbsp;1909.',
                        '<img src="./images/icons/pony/maggie.svg"');
                    break;
                case 'al':
                    writeIt('Al',
                        'So beloved by his driver, Al was bought by the driver and retired to the driver’s ranch to live out the rest of his days in peace and&nbsp;quiet.',
                        '<img src="./images/icons/pony/al.svg"');
                    break;
            }

            $.publish('Ponied');
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

        $('#question-10 .responses').one('click', 'input:radio', function () {
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
