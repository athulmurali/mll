/**
 * @author Athul Muralidharan
 *
 *
 * This controller is for the view whatisthis1.html
 * Version 2 :  Added data for genres, owners, trackTypes
 *
 * Optional feature : license type
 *
 * Note : once the validation is successful, an alert message will be displayed
 *        To be removed once the navigation is functional
 */

(function () {
    'use strict';

    angular
        .module('MLLabApp')
        .controller('AddMusicController1',
            function($scope,$location)
            {
                console.log("this :  " + this);

                // Declare available genres below:
                this.genres = [ "Rock", "Jazz", "Blues","Pop","Soul","Others"];

                // Declare available Owner types below
                this.owners =  ["Registered User1", "Registered User2"]

                // Declare available Owner types below
                this.licenses = [ "Public Performing Right", "Reproduction Right", "Synchronization License"];

                // Declare available track types

                this.trackTypes = ["Instrumental","Movie Soundtrack","Classical"];

                // function to process the form
                this.submit = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    console.log($location.url);
                    $location.url("/what-is-this2");

                };
            });
})();


