/*jslint white:false */
/*global angular */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function () {
    'use strict';

    angular
        .module('app.masonry', [])
        .directive("masonry", function () {
            var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';

            return {
                compile: function (element, attrs) {
                    var animation, $brick, type, itemSelector;

                    // auto add animation to brick element
                    animation = attrs.ngAnimate || "'masonry'";
                    $brick = element.children();
                    $brick.attr("ng-animate", animation);
                    // generate item selector (exclude leaving items)
                    type = $brick.prop('tagName');
                    itemSelector = type + ":not([class$='-leave-active'])";

                    return function (scope, element, attrs) {
                        var options;

                        options = angular.extend({
                            itemSelector: itemSelector
                        }, scope.$eval(attrs.masonry));

                        // try to infer model from ngRepeat
                        if (!options.model) {
                            var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);

                            if (ngRepeatMatch) {
                                options.model = ngRepeatMatch[4];
                            }
                        }
                        // initial animation
                        element.addClass('masonry');

                        // Wait inside directives to render
                        setTimeout(function () {
                            element.masonry(options);

                            element.on("$destroy", function () {
                                element.masonry('destroy');
                            });

                            if (options.model) {
                                scope.$apply(function () {
                                    scope.$watchCollection(options.model, function (_new, _old) {
                                        if (_new !== _old) {
                                            // Wait inside directives to render
                                            setTimeout(function () {
                                                element.masonry("reload");
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    };
                }
            };
        });

})();
