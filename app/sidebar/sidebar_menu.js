/**
 * Created by robertoreym on 27/01/16.
 */
'use strict';

(function ()
{
    var app = angular.module('sidebarMenu', []);
    app.directive('sidebarMenu', function ()
    {
        return {
            restrict: 'E',
            templateUrl: 'sidebar/sidebar-menu.html',
            controller: ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope)
            {
                $rootScope.tab = 1;
                $scope.userTypePrivileges = [
                    [],
                    [1,2,3],
                    [1,4,3],
                    [1,4,3]
                ];

                $scope.isTabSelected = function (tab)
                {
                    return (tab == $scope.tab);
                };
                $scope.setTab = function (tab)
                {
                    $scope.tab = tab;
                };
                $scope.go = function (path)
                {
                    $location.path(path);
                };
                $scope.logout = function (path)
                {
                    localStorage.clear();
                    location.reload();
                };
                $('.tree-toggler').click(function ()
                {
                    $(this).parent().children('ul.tree').toggle('blind');
                });

                $scope.currentUserHasTabPrivileges = function(tab)
                {
                    return (-1<$.inArray(tab,$scope.userTypePrivileges[parseInt(localStorage.getItem("userType"))]))?true:false;
                }
            }],
            controllerAs: 'sidebarCtrl'
        };
    });
    app.config(function ($logProvider)
    {
        $logProvider.debugEnabled(true);
    });
})();
$(document).ready(function ()
{
    $('.tree-toggler').click(function ()
    {
        $(this).parent().children('ul.tree').toggle(300);
    });
});