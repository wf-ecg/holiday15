/*jslint white:false */
/*global angular */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MasonryController',
            templateUrl: './layout/index.html',
        });
}
