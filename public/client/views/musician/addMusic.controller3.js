/**
 * @author Athul Muralidharan
 *
 *
 * This controller for view whatisthis3.html
 * Version 2 :  Added data for genres, owners, trackTypes
 *
 * Optional feature : lincense type
 *
 * Navigation is functional
 */

(function () {
    'use strict';

    angular
        .module('MLLabApp')
        .controller('AddMusicController3',
            function($scope,$location)
            {

                // function to process the form
                this.submit = function() {
                    // data container  to store data
                    $scope.formData = this.data;
                    //
                    console.log($scope.formData);
                    $location.url("/what-is-this4");

                };

            });
})();


