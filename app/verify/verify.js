'use strict';

angular.module('myApp.verify', ['ngRoute','ngMaterial'])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/verify/:email/:token', {
            templateUrl: 'verify/verify.html'
        });
    }])
    .controller('verifyController',["$scope","$routeParams","$location","$rootScope","$mdDialog", function ($scope,$routeParams,$location,$rootScope,$mdDialog)
    {
    	var that = this;
    	$scope.email = "";
    	$scope.password = "";
    	that.verifyResponseHandler = function(err, data)
    	{
    		$scope.$apply(function()
    		{
				if(err)
				{
					console.log(err, err.stack);
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('body')))
						.title('Revisa tu conexión a internet!')
						.textContent(err)
						.ariaLabel('Register Error')
						.ok('OK')
					)
					.then(function()
					{
						$location.path("/login");
					});
				}
				else
				{
					var output = JSON.parse(data.Payload);
					if (!output.verified) {
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('.verify-container')))
							.title('Tu código ha expirado!')
							.textContent("")
							.ariaLabel('Register Error')
							.ok('OK')
						)
						.then(function()
						{
							$location.path("/login");
						});
					}
					else
					{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('.verify-container')))
							.title('Ya puedes iniciar sesión!')
							.textContent("")
							.ariaLabel('Register Error')
							.ok('OK')
						)
						.then(function()
						{
							$location.path("/login");
						});
					}
				}
			});
		};
    	$scope.doVerify = function()
    	{
  			var lambda = new AWS.Lambda();
  			var input ={
				email: $routeParams.email,
				token: $routeParams.token
			};
  			lambda.invoke({
				FunctionName: 'SEPCertificacionUserVerify',
				Payload: JSON.stringify(input)
			}, that.verifyResponseHandler);
    	};
    	$scope.$watch('$viewContentLoaded', function(){
			$scope.doVerify();
		});
    }]);