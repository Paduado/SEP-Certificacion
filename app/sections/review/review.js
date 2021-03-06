'use strict';

angular.module('myApp.review', ['ngRoute']).config([
    '$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/review/:appId', {
            templateUrl: 'sections/review/review.html', controller: 'ReviewCtrl'
        });
    }
]).controller('ReviewCtrl', function ($scope, $mdDialog,$route)
{

    var docClient = new AWS.DynamoDB.DocumentClient();


    var params = {
        TableName: "applications",
        Key:{
            applicationID:$route.current.params.appId
        }
    };

    docClient.get(params, function (err, data)
    {
        if (err)
        {

        } else
        {
            console.log(data);
            $scope.application=data.Item;
            $scope.$digest();
        }
    })

    $scope.openFile = function(file)
    {
        window.open(file);
    };


    $scope.states = [
        {key: "01", name: "Aguascalientes"}, {key: "02", name: "Baja California"}, {
            key: "03", name: "Baja California Sur"
        }, {key: "04", name: "Campeche"}, {key: "05", name: "Coahuila de Zaragoza"}, {
            key: "06", name: "Colima"
        }, {key: "07", name: "Chiapas"}, {key: "08", name: "Chihuahua"}, {
            key: "09", name: "Distrito Federal"
        }, {key: "10", name: "Durango"}, {key: "11", name: "Guanajuato"}, {key: "12", name: "Guerrero"}, {
            key: "13", name: "Hidalgo"
        }, {key: "14", name: "Jalisco"}, {key: "15", name: "México"}, {
            key: "16", name: "Michoacán de Ocampo"
        }, {key: "17", name: "Morelos"}, {key: "18", name: "Nayarit"}, {key: "19", name: "Nuevo León"}, {
            key: "20", name: "Oaxaca"
        }, {key: "21", name: "Puebla"}, {key: "22", name: "Querétaro"}, {key: "23", name: "Quintana Roo"}, {
            key: "24", name: "San Luis Potosí"
        }, {key: "25", name: "Sinaloa"}, {key: "26", name: "Sonora"}, {key: "27", name: "Tabasco"}, {
            key: "28", name: "Tamaulipas"
        }, {key: "29", name: "Tlaxcala"}, {key: "30", name: "Veracruz de Ignacio de la Llave"}, {
            key: "31", name: "Yucatán"
        }, {key: "32", name: "Zacatecas"}
    ];

    $scope.profiles = [
        {
            profType: 1, levelType: 1, profile: "Secundaria"
        },
        {profType: 2, levelType: 2, profile: "Bachillerato"},
        {profType: 3, levelType: 3, profile: "Piloto Aviador"},
        {profType: 3, levelType: 3, profile: "Policía Investigador"},
        {profType: 3, levelType: 3, profile: "Comercialización inmobiliaria"},
        {profType: 4, levelType: 4, profile: "Comercio y Negocios Internacionales"},
        {profType: 4, levelType: 4, profile: "Mercadotécnia"},
        {profType: 4, levelType: 4, profile: "Pedagogía"},
        {profType: 4, levelType: 4, profile: "Ciencias de la Educación"},
        {profType: 4, levelType: 4, profile: "Turismo"},
        {profType: 5, levelType: 4, profile: "Admin"},
        {profType: 5, levelType: 4, profile: "Informática"},
        {profType: 6, levelType: 4, profile: "Actuaría"},
        {profType: 6, levelType: 4, profile: "Ingeniería Agronómica"},
        {profType: 6, levelType: 4, profile: "Ingeniería Civil"},
        {profType: 6, levelType: 4, profile: "Ingeniería Eléctrica"},
        {profType: 6, levelType: 4, profile: "Ingeniería Electrónica"},
        {profType: 6, levelType: 4, profile: "Ingeniería Industrial"},
        {profType: 6, levelType: 4, profile: "Ingeniería Mecánica"},
        {profType: 6, levelType: 4, profile: "Ingeniería Mecánica-Eléctrica"},
        {profType: 6, levelType: 4, profile: "Derecho"},
        {profType: 6, levelType: 4, profile: "Contaduría"},
        {profType: 7, levelType: 4, profile: "Matemáticas"},
        {profType: 7, levelType: 4, profile: "Ingeniería Computacional"},
        {profType: 7, levelType: 4, profile: "Ingeniería Mecatrónica"},
        {profType: 7, levelType: 4, profile: "Ingeniería de Software"},
        {profType: 7, levelType: 4, profile: "Ingeniería Topográfica"},
        {profType: 7, levelType: 4, profile: "Ciencias de la Comunicación"},
        {profType: 7, levelType: 4, profile: "Economía"},
        {profType: 7, levelType: 4, profile: "Sociología"},
        {profType: 7, levelType: 4, profile: "Cinema"},
        {profType: 7, levelType: 4, profile: "Diseño"},
        {profType: 7, levelType: 4, profile: "DiseñoPublicidad en Moda"},
        {profType: 7, levelType: 4, profile: "Filosofía"},
        {profType: 7, levelType: 4, profile: "Historia"},
        {profType: 7, levelType: 4, profile: "Educ Primaria"},
        {profType: 7, levelType: 4, profile: "Educación Indígena"},
        {profType: 7, levelType: 4, profile: "Ciencias Computacionales"},
        {profType: 8, levelType: 4, profile: "Educación preescolar"},
        {profType: 9, levelType: 5, profile: "Actuación"},
        {profType: 9, levelType: 5, profile: "Cinematografía"},
        {profType: 9, levelType: 5, profile: "Administración"},
        {profType: 9, levelType: 5, profile: "Administración Pública"},
        {profType: 9, levelType: 5, profile: "Ciencias Religiosas"},
        {profType: 9, levelType: 5, profile: "Teología"},
        {profType: 9, levelType: 5, profile: "Interpretación"},
        {profType: 9, levelType: 5, profile: "Comercio Exterior y Aduanas"},
        {profType: 9, levelType: 5, profile: "Dirección Orquestal"},
        {profType: 9, levelType: 5, profile: "Educación Preescolar"},
        {profType: 9, levelType: 5, profile: "Educación Primaria"}
    ];


    $scope.accept =  function()
    {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "applications";

        var date = new Date().getTime();

        // Update the item, unconditionally,

        var params = {
            TableName:table,
            Key:{
                "applicationID": $scope.application.applicationID
            },
            UpdateExpression: "set applicationStatus = :s, uploadTimestamp = :u",
            ExpressionAttributeValues:{
                ":s": 3,
                ":u": date
            },
            ReturnValues:"UPDATED_NEW"
        };

        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .title('Solicitud Aceptada')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                );
                $scope.go('applications/search');
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                go("/apps/search");
            }
        });



    };

    $scope.reject = function ()
    {
        var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "applications";

        var date = new Date().getTime();

        // Update the item, unconditionally,

        var params = {
            TableName: table, Key: {
                "applicationID": $scope.application.applicationID
            }, UpdateExpression: "set applicationStatus = :s, uploadTimestamp = :u", ExpressionAttributeValues: {
                ":s": 4, ":u": date
            }, ReturnValues: "UPDATED_NEW"
        };

        console.log("Updating the item...");
        docClient.update(params, function (err, data)
        {
            if (err)
            {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else
            {
                $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('body'))).clickOutsideToClose(true).title('Solicitud Cancelada').ariaLabel('Alert Dialog Demo').ok('Aceptar'));
                $scope.go('applications/search');
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                go("/apps/search");
            }
        });
    };

    //$scope.generatePDF = function()
    //{
    //    var doc = new PDFDocument();
    //    var stream = doc.pipe(blobStream());
    //
    //    doc.fontSize(25)
    //    .text('Here is some vector graphics...', 100, 80);
    //
    //    doc.end();
    //    stream.on('finish', function() {
    //        var frame = document.getElementById("myframe");
    //        frame.src = stream.toBlobURL('application/pdf');
    //    });
    //};

});