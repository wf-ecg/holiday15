/*jslint white:false */
/*global define, angular */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['angularAMD', 'angularRT'], function (angularAMD) {

    var app = angular.module('ngapp', ['ngRoute']);

    app.config(function ($routeProvider) {

        $routeProvider.when('/', angularAMD.route({
            templateUrl: './includes/_main.html',
        }));

    });

    return angularAMD.bootstrap(app);
});
