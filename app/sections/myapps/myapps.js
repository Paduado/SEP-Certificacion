'use strict';

angular.module('myApp.myapps', ['ngRoute', 'smart-table'])

    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/myapps', {
            templateUrl: 'sections//myapps/myapps.html',
            controller: 'MyappsCtrl'
        });
    }])

    .controller('MyappsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope)
    {


        var params = {
            TableName: "applications",
            "IndexName": "userID-index",
            KeyConditionExpression: "#a = :a",
            ExpressionAttributeNames:{
                "#a": "userID"
            },
            ExpressionAttributeValues: {
                ":a":localStorage.getItem("identityID")
            }
        };

        var docClient = new AWS.DynamoDB.DocumentClient();

        docClient.query(params,function (err, data)
        {
            if (err)
            {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else
            {
                console.log("Scan succeeded.");
                console.log(data.Items);
                $scope.applications = data.Items;
                $scope.$digest();
                if (typeof data.LastEvaluatedKey != "undefined")
                {
                    console.log("Scanning for more...");
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                }
            }
        });

        $scope.formatDate = function (timestamp)
        {
            var date = new Date();
            date.setTime(timestamp);

            var month = date.getMonth() + 1;
            var day = date.getDate();


            month = (month < 10 ? "0" : "") + month;
            day = (day < 10 ? "0" : "") + day;
            return  date.getFullYear() + "-" + month + "-" + day;

        };

        $scope.getStatus = function (status)
        {
            switch (status)
            {
                case 1:
                    return "No enviada";
                case 2:
                    return "Pendiente";
                case 3:
                    return "Aceptado";
                case 4:
                    return "Rechazado";
            }
        };
        $scope.getType = function(type)
        {
            switch (type)
            {
                case 1:
                    return "Educación Básica";

                case 2:
                    return "Educación Media Superior";

                case 3:
                    return "Técnico Superior Universitario";

                case 4:
                    return "Educación Superior";

                case 5:
                    return "Superior";
                default:
                    return "";

            }
        };


        $scope.openDetails = function (appId)
        {
            $rootScope.application = appId;
            $scope.go('/review/'+appId);
        };


        $scope.onReorder = function (order) {
            console.log(order)
          };
    }]);