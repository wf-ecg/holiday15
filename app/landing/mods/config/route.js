/*jslint white:false */
/*global angular */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'MasonryController',
                templateUrl: './includes/_main.html',
            });
    }
})();
