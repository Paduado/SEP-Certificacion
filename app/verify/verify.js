'use strict';

angular.module('myApp.signup', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/signup/:email/:code', {
            templateUrl: 'signup/signup.html'
        });
    }])
    .controller('signupController',["$scope","$routeParams","$location","$rootScope", function ($scope,$routeParams,$location)
    {
    	var that = this;
    	$scope.email = "";
    	$scope.password = "";
    	$scope.signingUp = false;
    	$scope.invalidSignUp = false;
    	that.handleSignUpResponse = function(err, data)
    	{
    		$scope.$apply(function()
    		{
				$scope.signingUp = false
				if(err)
				{
					$scope.invalidSignUp = true;
					console.log(err, err.stack);
				}
				else
				{
					var output = JSON.parse(data.Payload);
					if (!output.register) {
						$scope.invalidSignUp = true;
					}
					else
					{
					}
				}
			});
		};
		$scope.test = function()
		{
			console.log($routeParams.email);
		}
    	$scope.doSignUp = function()
    	{
    		$scope.invalidSignUp = false;
  			var lambda = new AWS.Lambda();
  			var input ={
				email: $scope.email,
				password: $scope.password
			};
			$scope.loggingIn = true;
  			lambda.invoke({
				FunctionName: 'SEPCertificacionUserRegister',
				Payload: JSON.stringify(input)
			}, that.handleSignUpResponse);
    	};

    }]);