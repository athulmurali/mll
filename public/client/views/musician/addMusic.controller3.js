/**
 * @author Sbeha Lakshisha, Athul Muralidharan
 *
 *
 * This controller is a common controller for pages related to adding music
 * Version 1 :  Added data for genres, owners, trackTypes
 *
 * Optional feature : lincense type
 *
 * Note : once the validation is successful, an alert message will be displayed
 *        To be removed once the navigation is functional
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
                    alert('page -complete');
                    console.log($location.url);
                    $location.url("/what-is-this3");

                };

                // function to process the form
                this.reset = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    alert('page -complete');
                    $location.url("/what-is-this1");

                };
            });
})();


