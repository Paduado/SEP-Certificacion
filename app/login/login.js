'use strict';

angular.module('myApp.login', ['ngRoute','ngMaterial'])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
        });
    }])
    .controller('loginController',["$scope","$location","$rootScope","$mdDialog", function ($scope,$location,$rootScope,$mdDialog)
    {
    	var that = this;
    	$scope.email = "";
    	$scope.password = "";
    	$scope.loggingIn = false;
    	$scope.invalidLogin = false;
    	that.updateCredentialsResponseHandler = function(err)
    	{
    		$scope.$apply(function()
    		{
				if (err) console.log(err, err.stack);
				else {
					$location.path("/applications/search");
				}
			});
    	};
    	that.loginResponseHandler = function(err, data)
    	{
    		$scope.$apply(function()
    		{
				$scope.loggingIn = false
				if(err)
				{
					$scope.invalidLogin = true;
					console.log(err, err.stack);
				}
				else
				{
					var output = JSON.parse(data.Payload);
					if (!output.login) {
						$scope.invalidLogin = true;
						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('.login-container')))
							.clickOutsideToClose(true)
							.title('Email/contraseña inválidos')
							.ariaLabel('Register Error')
							.ok('OK')
						);
					}
					else
					{
						localStorage.setItem("userIsLoggedIn", true);
						localStorage.setItem("userType", output.userType);
						localStorage.setItem("identityID", output.identityId);
						localStorage.setItem("identityPoolID", output.identityPoolID);
						localStorage.setItem("token", output.token);
						localStorage.setItem("userProfileIsComplete", output.userProfileIsComplete);
						localStorage.setItem("currentUserData", output.currentUserData);

						$mdDialog.show(
							$mdDialog.alert()
							.parent(angular.element(document.querySelector('.login-container')))
							.clickOutsideToClose(true)
							.title('Bienvenido!')
							.ariaLabel('Register Error')
							.ok('OK')
						);

						var creds = AWS.config.credentials;
						creds.params.IdentityPoolId = output.identityPoolID;
						creds.params.IdentityId = output.identityId;
						creds.params.Logins = {
							'cognito-identity.amazonaws.com': output.token
						};
						creds.expired = true;
						AWS.config.credentials.get(that.updateCredentialsResponseHandler);
					}
				}
			});
		};
    	$scope.doLogin = function()
    	{
    		$scope.invalidLogin = false;
    		localStorage.setItem("userEmail", $scope.email);
  			var lambda = new AWS.Lambda();
  			var input ={
				email: $scope.email,
				password: $scope.password
			};
			$scope.loggingIn = true;
  			lambda.invoke({
				FunctionName: 'SEPLogin',
				Payload: JSON.stringify(input)
			}, that.loginResponseHandler);
    	};

    }]);