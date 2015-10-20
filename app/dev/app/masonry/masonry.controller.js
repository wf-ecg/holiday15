(function () {
    'use strict';

    angular
        .module('app.masonry')
        .controller('MasonryController', MasonryController);

    MasonryController.$inject = ['$timeout', '$scope', '$http'];

    /* @ngInject */
    function MasonryController($timeout, $scope, $http) {
        var vm = this;
        vm.title = 'MasonryController';

        $scope.items = [
            {
                "id": 0,
                "picture": "http://placehold.it/464x464",
                "age": 31,
                "name": "Mathews Goff",
                "color": "blue",
                "size": "sm",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
                "link": "#"
            },
            {
                "id": 1,
                "picture": "http://placehold.it/32x32",
                "age": 32,
                "name": "Julie Jefferson",
                "color": "red",
                "size": "sm",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
                "link": "#"
            },
            {
                "id": 2,
                "picture": "http://placehold.it/464x464",
                "age": 23,
                "name": "Stanley Moore",
                "color": "blue",
                "size": "lg",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
                "link": "#"
            },
            {
                "id": 3,
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "name": "Collins Alston",
                "color": "red",
                "size": "sm",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
                "link": "#"
            },
            {
                "id": 4,
                "picture": "http://placehold.it/32x32",
                "age": 27,
                "name": "Jasmine Rollins",
                "color": "orange",
                "size": "sm",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
                "link": "#"
            },
            {
                "id": 5,
                "picture": "http://placehold.it/32x32",
                "age": 23,
                "name": "Wilder King",
                "color": "purple",
                "size": "sm",
                "message": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
                "link": "#"
            },
        ];
    }
})();
