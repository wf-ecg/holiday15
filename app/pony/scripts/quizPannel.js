/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['jquery', 'hammer'], function ($, Hammer) {
    var W, C;

    W = W || window;
    C = C || W.console;

    (function () { // from http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var Nom = 'smartresize';

        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function () { // debounced
                var obj = this, args = arguments;

                function delayed() {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                }
                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }
                timeout = setTimeout(delayed, threshold || 100);
            };
        };
        $.fn[Nom] = function (fn) {
            return fn ? this.bind('resize', debounce(fn)) : this.trigger(Nom);
        };

    })();

// Set close gradient classes on form panels
    function updatePanelClasses() {
        var panels = $('.panel');
        var newIndex = $('.panel-collapse').index($('.panel-collapse.in'));
        //  var nextButton = $('.quiz-next');

        //drop old close-classes
        panels.removeClass('active');
        panels.removeClass(function (idx, css) {
            return (css.match(/(^|\s)close-\d+/g) || []).join(' ');
        });

        //add active to current panel
        panels.eq(newIndex).addClass('active');

        // add close-# classes to control gradient fade
        panels.each(function (panelIndex) {
            $(this).addClass("close-" + Math.abs(panelIndex - newIndex));
        });
    }

// Set active indicator on progress indicator
    function updateProgressButtons() {
        var panels = $('.panel');
        var buttons = $('.progress-button');
        //set answered flags on nav buttons
        panels.each(function (idx) {
            if ($(this).find('input:checked').length)
            {
                buttons.eq(idx).addClass('answered');
            }
            else
            {
                buttons.eq(idx).removeClass('answered');
            }
        });

        var newIndex = $('.panel-collapse').index($('.panel-collapse.in'));
        buttons.removeClass("active");
        buttons.eq(newIndex).addClass("active");
    }

    function advancePanel() {
        var current = $('.panel-collapse.in');
        current.find('.quiz-next').trigger('click');
    }

    function retractPanel() {
        var current = $('.panel-collapse.in');
        current.find('.quiz-prev').trigger('click');
    }

    function focusPanel() {
        var current = $('.panel-collapse.in h2');
        current.attr("tabIndex", -1).focus();
        //console.log(current);
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
            $('.panel-body').height(bodyheight);
            // Center the indicators
            $('.progress-indicators').css("margin-top", "-" + progressCenter + "px");
        }

        quizInit();
        updatePanelClasses();

        $(W).smartresize(function () {
            quizInit();
        });

        //update certain display setting whenever collapse events occur
        $('#quiz-group').on('shown.bs.collapse', function () {
            updateProgressButtons();
            updatePanelClasses();
        });

        $('#QuizWelliFa input').change(function () {
            //advance to next Question

            advancePanel();
            focusPanel();

            //Tally the points
            var tally = {};
            var tally_total = 0;

            $('#QuizWelliFa input:selected,#QuizWelliFa input:checked').each(function () {
                var i, tuple, tuples, arrayLength, persona, weight;

                //break up the form value into persona_weight
                tuples = $(this).first().val().split(':');
                arrayLength = tuples.length;

                for (i = 0; i < arrayLength; i++) {

                    tuple = tuples[i].split('_');
                    persona = tuple[0];
                    weight = Number(tuple[1]);

                    if (weight === 0) {
                        continue;
                    }
                    //make the bucket if it's not there already
                    if (typeof tally[persona] === 'undefined') {
                        tally[persona] = 0;
                    }

                    //add the value
                    tally[persona] += weight;
                    tally_total += Math.abs(weight);
                }
            });


            //figure out winner
            var ponies = [];

            for (var persona in tally) {
                ponies.push(persona);
            }

            ponies.sort(function (a, b) {
                return tally[b] - tally[a];
            });

            var result_page = $('#results-container');


            // $('#QuizWelliFa').attr('action', result_page);
            $('#QuizWelliFa input:radio[name=q10]').click(function () {
                getPony();
                //alert("game over");
            });

            //keep at bottom - let exceptions get lost for Safari
            W.localStorage.setItem('quiz_tally', JSON.stringify(tally));
            W.localStorage.setItem('quiz_type', JSON.stringify(ponies));

            function getPony() {
                //alert("I'm getting the pony");

                $('#myQuiz').removeClass('visible').addClass('hidden');
                $('#results-container').removeClass('hidden').addClass('visible');

                var panels = $('.panel');
                var vwidth = $(W).width();
                if (vwidth < 768) {
                    var panelheight = 0;
                    var vheight = W.innerHeight;
                } else {
                    var panelheight = 0;
                    var vheight = $(W).height();
                }
                var bodyheight = vheight - (panels.length * panelheight) + panelheight;


                // Set the height of the panel to fil the screen, assuming a 10 pixel ribbon
                $('.panel-body').height(bodyheight);



                function displayCase() {
                    var rand = Math.floor((Math.random() * 10) + 0); // returns a random number between 1 and 10
                    var ponyName = ponies[rand];
                    var pn = ponyName;

                    //console.log(rand, ponies, pn);

                    switch (pn) {
                        case (pn === "eltoro"):
                            document.getElementById("pn").innerHTML = "El Toro";
                            document.getElementById("pnBio").innerHTML =
                                "'The Bull' worked in Wells Fargo’s Mexico City headquarters. At 27 years of age, he was oldest horse in the stables and only worked a few hours a week to keep him limber.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/eltoro.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "mollie"):
                            document.getElementById("pn").innerHTML = "Mollie";
                            document.getElementById("pnBio").innerHTML =
                                "A beautiful white mare that led the stagecoach team that brought stagecoach President Hayes to Roseburg, Oregon, narrowly missing a run-in with the notorious bandit, Black Bart.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/mollie.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "snowflake"):
                            document.getElementById("pn").innerHTML = "Snowflake";
                            document.getElementById("pnBio").innerHTML =
                                "A pristine white horse, Snowflake lived in New Jersey and rode a ferry across the Hudson every morning to pull a wagon throughout Manhattan. ";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/snowflake.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "king"):
                            document.getElementById("pn").innerHTML = "King";
                            document.getElementById("pnBio").innerHTML =
                                "A black horse, King faithfully served Wells Fargo in Las Vegas, New Mexico, and Los Angeles.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/king.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "nellie"):
                            document.getElementById("pn").innerHTML = "Nellie";
                            document.getElementById("pnBio").innerHTML =
                                "With blazing speed, Nellie helped get her driver’s sick brother to a doctor and then finished her Wells Fargo route.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/nellie.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "buck"):
                            document.getElementById("pn").innerHTML = "Buck";
                            document.getElementById("pnBio").innerHTML =
                                "Handsome Buck started working for Wells Fargo in 1900 in Ardmore Oklahoma Territory. White he wasn’t the largest horse in the stable, Buck could pull a fully-loaded express wagon all by himself.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/buck.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "mack"):
                            document.getElementById("pn").innerHTML = "Mack";
                            document.getElementById("pnBio").innerHTML =
                                "One of the most beloved horses that ever worked for Wells Fargo, the chestnut-colored Mack pulled a stagecoach on the Pioneer Stage Line from Placerville, California to Carson City, Nevada.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/mack.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "prince"):
                            document.getElementById("pn").innerHTML = "Prince";
                            document.getElementById("pnBio").innerHTML =
                                "A striking gray horse that got his name because he was the most handsome horse in Ardmore, Oklahoma Territory stables and because he cost the princely sum of $125.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/prince.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "dandy"):
                            document.getElementById("pn").innerHTML = "Dandy";
                            document.getElementById("pnBio").innerHTML =
                                "A big bay horse with a white mane, Dandy was one of the most valuable and expensive horses in 1895 Auburn, California. Wells Fargo paid $18 – top dollar in those days – to get him.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/dandy.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "billy"):
                            document.getElementById("pn").innerHTML = "Billy";
                            document.getElementById("pnBio").innerHTML =
                                "A trusty Appaloosa and an early media star featured in the February 1914 issue of the Wells Fargo Messenger.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/billy.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "trixie"):
                            document.getElementById("pn").innerHTML = "Trixie";
                            document.getElementById("pnBio").innerHTML =
                                "A fine brown and white Paint, Trixie was born and raised in Ardmore, Oklahoma Territory and started working for Wells Fargo in 1918, often donning a wool blanket in the winter months to stay warm.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/trixie.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "grace"):
                            document.getElementById("pn").innerHTML = "Grace";
                            document.getElementById("pnBio").innerHTML =
                                "Had a reputation for delivering customers express shipments in Los Angeles with a dignified manner and  was one of the last ponies to ever work for Wells Fargo.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/grace.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "maggie"):
                            document.getElementById("pn").innerHTML = "Maggie";
                            document.getElementById("pnBio").innerHTML =
                                "A brown mare with over 20 years service that represented Wells Fargo in the first annual San Francisco Work Horse Parade in 1909.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/maggie.svg' class='header-image-winner' alt='pony'>";
                            break;
                        case (pn === "al"):
                            document.getElementById("pn").innerHTML = "Al";
                            document.getElementById("pnBio").innerHTML =
                                "So beloved by his driver, Al was bought by the driver and retired to the driver’s ranch to live out the rest of his days in peace and quiet.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/al.svg' class='header-image-winner' alt='pony'>";
                            break;
                        default:
                            document.getElementById("pn").innerHTML = "Trixie";
                            document.getElementById("pnBio").innerHTML =
                                "A fine brown and white Paint, Trixie was born and raised in Ardmore, Oklahoma Territory and started working for Wells Fargo in 1918, often donning a wool blanket in the winter months to stay warm.";
                            document.getElementById("pnIcon").innerHTML =
                                "<img src='./images/icons/pony/trixie.svg' class='header-image-winner' alt='pony'>";
                            break;
                    }
                }
                displayCase();
            }
        });

        $('#newQuiz').click(function () {
            location.reload();
        });

        $('.filler').click(function () {
            var target = $(this).parent().find('input');
            target.prop('checked', true);
            target.change();
        });

        var hammertime = new Hammer(document.body, {preventDefault: true});

        hammertime.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});

    });

});
