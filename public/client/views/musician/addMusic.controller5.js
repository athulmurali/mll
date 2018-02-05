/**
 * @author  Athul Muralidharan
 *
 *
 * This controller is for the view whatisthis5.html
 * Version 2 :
 *
* Navigation is functional
 *
 * IF upload more button is clicked in the view whatisthis5.html,
 * it redirects to the view whatisthis1.html
 *
 * if Done is clicked, it redirects to 'about'
 */

(function () {
    'use strict';

    angular
        .module('MLLabApp')
        .controller('AddMusicController5',
            function($scope,$location)
            {

                // function to process the form
                this.quit = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    console.log("Quitting.........");
                    $location.url("/about");

                };

                // function - to start over again
                this.onAgain = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    console.log($scope.formData);
                    console.log();
                    $location.url("/what-is-this1");
                };
            });
})();


