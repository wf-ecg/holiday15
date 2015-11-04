/*jslint white:false */
/*global angular */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function () {
    'use strict';

    angular
        .module('app', ['app.core']);

    angular
        .module('app.core', ['ngRoute']);

    angular
        .module('app')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: './includes/_main.html',
                });
        });

})();
