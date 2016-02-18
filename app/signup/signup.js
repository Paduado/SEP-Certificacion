'use strict';

angular.module('myApp.signup', ['ngRoute','ngMaterial'])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/signup', {
            templateUrl: 'signup/signup.html'
        });
    }])
    .controller('signupController',["$scope","$location","$rootScope","$mdDialog", function ($scope,$location,$rootScope,$mdDialog)
    {
    	var that = this;
    	$scope.email = "";
    	$scope.password = "";
    	$scope.signingUp = false;
    	$scope.invalidSignUp = false;
    	that.signUpResponseHandler = function(err, data)
    	{
    		$scope.$apply(function()
    		{
				$scope.signingUp = false
				if(err)
				{
					$scope.invalidSignUp = true;
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('.signup-container')))
						.clickOutsideToClose(true)
						.title('No se pudo dar de alta tu correo!')
						.textContent(err)
						.ariaLabel('Register Error')
						.ok('OK')
					);
				}
				else
				{
					var output = JSON.parse(data.Payload);
					if ((output.errorMessage) || (!output.created)){
						$scope.invalidSignUp = true;
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('.signup-container')))
							.clickOutsideToClose(true)
							.title('No se pudo dar de alta tu correo!')
							.textContent(output.errorMessage)
							.ariaLabel('Register Error')
							.ok('OK')
						);
					}
					else
					{
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('.signup-container')))
							.clickOutsideToClose(true)
							.title('Listo!')
							.textContent('Recibiras un correo de confirmación para poder iniciar sesión')
							.ariaLabel('Register Success')
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
    	$scope.doSignUp = function()
    	{
    		$scope.invalidSignUp = false;
  			var lambda = new AWS.Lambda();
  			var input ={
				email: $scope.email,
				password: $scope.password
			};
			$scope.signingUp = true;
  			lambda.invoke({
				FunctionName: 'SEPCertificacionUserRegister',
				Payload: JSON.stringify(input)
			}, that.signUpResponseHandler);
    	};

    }]);