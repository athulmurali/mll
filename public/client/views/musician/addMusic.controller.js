(function () {
    'use strict';

    angular
        .module('MLLabApp')
        .controller('InviteController', InviteFormController);

    function InviteFormController($scope, InviteService) {

        this.showSuccess = false;

        // Genres to be added here 
        this.gemres = [ "Rock", "Jazz", "Blues","Pop","Others"];



        this.invite = () => {
            var user = {
                name : $scope.email.name,
                email : $scope.email.to,
                messageBody: this.messageBody
            };

            InviteService
                .addUserToDB(user);

            this.showSuccess = true;
        }

    }
})();