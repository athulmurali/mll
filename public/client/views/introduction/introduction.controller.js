/**
 * @author  Athul Muralidharan
 *
 *
 * This controller for view introduction.view.html
 * Version 2 :
 *
 *
 * Navigation is functional
 */

(function () {
    'use strict';
    console.log("gi")

    angular
        .module('MLLabApp')
        .controller('IntroductionController',
            function($scope,$location)
            {

                // function to process the form
                this.submit  =  function() {
                    $location.url("/register");
                };
            });
})();
