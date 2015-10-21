/*jslint white:false */
/*global angular */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
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
            id: 0,
            color: 'blue',
            size: 'sm',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
            link: '#'
        },
        {
            id: 1,
            color: 'red',
            size: 'sm',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
            link: '#'
        },
        {
            id: 2,
            color: 'blue',
            size: 'lg',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
            link: '#'
        },
        {
            id: 3,
            color: 'red',
            size: 'sm',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
            link: '#'
        },
        {
            id: 4,
            color: 'orange',
            size: 'sm',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
            link: '#'
        },
        {
            id: 5,
            color: 'purple',
            size: 'sm',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
            link: '#'
        },
      ];
    }
})();
