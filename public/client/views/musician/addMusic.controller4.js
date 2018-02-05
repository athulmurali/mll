/**
 * @author  Athul Muralidharan
 *
 *
 *
 * This controller is for the view whatisthis4.html
 * Version 2 :
 *
 *
 * Navigation is functional
 */

(function () {
    'use strict';

    angular
        .module('MLLabApp')
        .controller('AddMusicController4',
            function($scope,$location)
            {

                // function to process the form
                this.reset = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    console.log($scope.formData);
                    console.log("resetting to previous... ");

                    $location.url("/what-is-this3");
                };

                // function to process the form
                this.submit = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    $location.url("/what-is-this5");

                };
            });
})();


