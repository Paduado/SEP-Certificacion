'use strict';

angular.module('myApp.profile', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/profile', {
            templateUrl: 'sections/profile/profile.html',
            controller: 'ProfileCtrl'
        });
    }])
    .controller('ProfileCtrl', function ($scope,$mdDialog)
    {

        $('#birthdate').datepicker({
            changeMonth: true,
            changeYear: true,
            onSelect: function (date)
            {
                var scope = angular.element($('#birthdate')).scope();
                scope.$apply(function ()
                {
                    scope.application.birthdate = date;
                });
            }
        });

        $scope.submit = function ()
        {

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .title('Datos Actualizados')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
            );
        };




    });






