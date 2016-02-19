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
        var that = this;
        $scope.user = {};

        if(localStorage.getItem("currentUserData") !== null)
        {
            $scope.user = JSON.parse(localStorage.getItem("currentUserData"));
            $scope.user.email = localStorage.getItem("userEmail");
            $scope.user.email2 = localStorage.getItem("userEmail");
        }

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
        that.updateUserDataResponseHandler = function(err)
        {
            $scope.$apply(function()
            {
                if (err) console.log(err, err.stack);
                else {
                    localStorage.setItem("userProfileIsComplete", true);
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('body')))
                            .clickOutsideToClose(true)
                            .title('Datos Actualizados')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Aceptar')
                    );
                }
            });
        };

        $scope.submit = function ()
        {
            var dynamodb = new AWS.DynamoDB();

            var options = {
                TableName : "SEPUsers",
                Key: {
                    email: {
                        S: localStorage.getItem("userEmail")
                    }
                },
                AttributeUpdates: {
                    lastname1: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.lastname1
                        }
                    },
                    lastname2: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.lastname2
                        }
                    },
                    firstname: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.firstname
                        }
                    },
                    sex: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.sex
                        }
                    },
                    birthdate: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.birthdate
                        }
                    },
                    curp: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.curp
                        }
                    },
                    cell: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.cell
                        }
                    },
                    phone: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.phone
                        }
                    },
                    country: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.country
                        }
                    },
                    state: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.state
                        }
                    },
                    city: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.city
                        }
                    },
                    colony: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.colony
                        }
                    },
                    street: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.street
                        }
                    },
                    cp: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.cp
                        }
                    },
                    number: {
                        Action: 'PUT',
                        Value: {
                            S: $scope.user.number
                        }
                    },
                    userProfileIsComplete: {
                        Action: 'PUT',
                        Value: {
                            BOOL: true
                        }
                    }
                }
            }

            dynamodb.updateItem(options, that.updateUserDataResponseHandler);
        };
    });






