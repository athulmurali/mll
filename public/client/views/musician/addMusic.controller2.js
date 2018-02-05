/**
 * @author  Athul Muralidharan
 *
 *
 * This controller for view whatisthis2.html
 * Version 2 :
 *
 *
 * Navigation is functional
 */

(function () {
    'use strict';

    angular
        .module('MLLabApp')
        .controller('AddMusicController2',
            function($scope,$location)
            {


                // function to process the form
                this.submit = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    console.log($location.url);
                    $location.url("/what-is-this3");

                };

                // function to process the form
                this.reset = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    $location.url("/what-is-this1");

                };
            });
})();


