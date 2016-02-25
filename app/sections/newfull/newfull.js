'use strict';

angular.module('myApp.newfull', ['ngRoute']).config([
    '$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/newfull', {
            templateUrl: 'sections/newfull/newfull.html', controller: 'NewFullCtrl'
        });
    }
]).controller('NewFullCtrl', function ($scope, $mdDialog)
{
    $scope.application = {};
    $scope.application.docs = {};
    $scope.application.userData = {};
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



    $scope.save = function()
    {
        $scope.uploadApplication(1);
    };
    $scope.submit = function ()
    {
        $scope.uploadApplication(2);
    };

    $scope.uploadApplication = function(status)
    {

        var docClient = new AWS.DynamoDB.DocumentClient();


        $scope.application.uploadTimestamp = Math.floor(Date.now());
        $scope.application.userID = localStorage.getItem("identityID");
        $scope.application.applicationID = Math.floor(Date.now()).toString();
        $scope.application.applicationStatus = status;

        var params = {
            TableName: 'applications',
            Item: $scope.application
        };

        docClient.put(params, function (err, data)
        {
            if (err)
            {
                $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('body'))).clickOutsideToClose(true).title('Error al subir la solicitud').textContent('Alguno de los campos esta vacio o con un formato erroneo.').ariaLabel('Alert Dialog Demo').ok('Aceptar'));
                console.log(err);
            } else
            {
                $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('body'))).clickOutsideToClose(true).title('Solicitud dada de alta').textContent('Aparecerá en el area de pendientes para su revisión.').ariaLabel('Alert Dialog Demo').ok('Aceptar'));
                console.log(data);
            }
        });


    };

    $scope.getUserData = function()
    {

    };

    $scope.applicationIncomplete = function()
    {

        var missingDocs = false;

        angular.forEach($scope.application.docs,function(value)
        {
            if(value == undefined)
                missingDocs = true;
        });
        return $scope.form.$invalid || missingDocs;

    };

    $scope.test = function()
    {
        console.log($scope.docs);
    }


    $('#birthdate').datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (date)
        {
            var scope = angular.element($('#birthdate')).scope();
            scope.$apply(function ()
            {
                scope.application.userData.birthdate = date;
            });
        }
    });

    $scope.log = function ()
    {
        console.log($scope.application);
    };

});







