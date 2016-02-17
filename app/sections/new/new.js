'use strict';

angular.module('myApp.new', ['ngRoute']).config([
    '$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/new', {
            templateUrl: 'sections/new/new.html', controller: 'NewCtrl'
        });
    }
]).controller('NewCtrl', function ($scope, $mdDialog)
{
    $scope.application = {
        type: "1",
        gender: "",
        subgender: "",
        lastname1: "",
        lastname2: "",
        firstname: "",
        email: "",
        phone: "",
        sex: "",
        birthdate: "",
        country: "",
        state: "",
        city: "",
        street: "",
        colony: "",
        cp: "",
        number: ""
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

    $scope.acta = "";
    $scope.actaProgress = "";

    $scope.curp = "";
    $scope.curpProgress = "";

    $scope.ident = "";
    $scope.identProgress = "";

    $scope.certAnt = "";
    $scope.certAntProgress = "";

    $scope.constHon = "";
    $scope.constHonProgress = "";

    $scope.cv = "";
    $scope.cvProgress = "";

    $scope.const = "";
    $scope.constProgress = "";

    $scope.constLab = "";
    $scope.constLabProgress = "";

    $scope.certComp = "";
    $scope.certCompProgress = "";

    $scope.port = "";
    $scope.portProgress = "";


    $scope.submit = function ()
    {

        $scope.application.uploadTimestamp = Math.floor(Date.now());
        $scope.application.userID = Math.floor(Date.now()).toString();
        $scope.application.applicationStatus = 1;
        var params = {
            TableName: 'applications', Item: $scope.application
        };

        var docClient = new AWS.DynamoDB.DocumentClient();

        docClient.put(params, function (err, data)
        {
            if (err)
            {
                $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('body'))).clickOutsideToClose(true).title('Error al subir la solicitud').textContent('Alguno de los campos esta vacio o con un formato erroneo.').ariaLabel('Alert Dialog Demo').ok('Aceptar'));
                console.log(err);
            } else
            {
                $mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('body'))).clickOutsideToClose(true).title('Solicitud dada de alta').textContent('Aparecerá en el area de pendientes para su revisión.').ariaLabel('Alert Dialog Demo').ok('Aceptar'));
                $scope.application = {
                    type: "1",
                    gender: "",
                    subgender: "",
                    lastname1: "",
                    lastname2: "",
                    firstname: "",
                    email: "",
                    phone: "",
                    sex: "",
                    birthdate: "",
                    country: "",
                    state: "",
                    city: "",
                    street: "",
                    colony: "",
                    cp: "",
                    number: "",
                    file1: "",
                    file2: "",
                    file3: ""
                };
                console.log(data);
            }
        });
    };


    $scope.onFileAdded = function (file, prop, indicator)
    {
        $scope[indicator] = 1;
        $scope.$digest();
        $scope.upload(file, function (err, data)
        {
            if (err)
                console.log(err); else
            {
                console.log(data.Location);
                //onUpload(data);
                $scope[prop] = data.Location;
                $scope.$digest();
            }
        }, function (progress)
        {
            $scope[indicator] = progress;
            $scope.$digest();
        });
    };

    $scope.upload = function (file, onUpload, onUploading)
    {
        var params = {Bucket: 'sepfiles', Key: file.name, Body: file, ACL: 'public-read'};

        var s3 = new AWS.S3();

        s3.upload(params, onUpload).on('httpUploadProgress', function (event)
        {
            console.log(Math.floor(event.loaded / event.total * 100));
            onUploading(Math.floor(event.loaded / event.total * 100));
        });

    };
    $scope.deleteFile = function (prop, indicator)
    {
        $scope[prop] = "";
        $scope[indicator] = 0;
        $scope.$digest()
    }

}).directive('dropfile', function ($compile)
{
    return function ($scope, element, attrs)
    {

        var html = '</div><div layout="row" layout-align="center center" ng-show="' + attrs.prop + ' == \'\' " class="dropzone">' + '<p>Arrastre archivo o haga click</p>' + '</div>' + '<div layout="row" layout-align="center" class="file-icon-container " ng-show="' + attrs.prop + ' != \'\'">' + '<md-icon class="file-icon" md-svg-src="resources/icons/ic_insert_drive_file.svg"></md-icon>' + '<md-icon class="delete-icon" md-svg-src="resources/icons/ic_delete_forever.svg">' + '<md-tooltip md-direction="left">' + 'Eliminar' + '</md-tooltip>' + '</md-icon>' + '</div>' + '<md-progress-linear ng-show="' + attrs.indicator + ' != 0" md-mode="determinate" ng-value="' + attrs.indicator + '"></md-progress-linear>' + '<div class="name"></div>';
        var template = angular.element(html);

        var linkFn = $compile(template);

        var e = linkFn($scope);

        angular.element(element[0]).append(e);


        var drop = element[0].getElementsByClassName('dropzone')[0];
        var iconContainer = element[0].getElementsByClassName('file-icon-container')[0];
        var fileIcon = iconContainer.getElementsByClassName('file-icon')[0];
        var deleteIcon = iconContainer.getElementsByClassName('delete-icon')[0];
        var name = element[0].getElementsByClassName('name')[0];
        var inputFile = document.getElementById('input-file');

        addEventHandler(drop, 'dragover', cancel);
        addEventHandler(drop, 'dragenter', cancel);
        addEventHandler(drop, 'drop', cancel);
        addEventHandler(drop, 'click', cancel);
        addEventHandler(iconContainer, 'click', cancel);
        addEventHandler(iconContainer, 'mouseover', cancel);
        addEventHandler(iconContainer, 'mouseleave', cancel);

        addEventHandler(drop, 'drop', function (e)
        {
            e = e || window.event; // get window.event if e argument missing (in IE)
            if (e.preventDefault)
            {
                e.preventDefault();
            } // stops the browser from redirecting off to the image.
            name.innerHTML = e.dataTransfer.files[0].name;
            $scope.onFileAdded(e.dataTransfer.files[0], attrs.prop, attrs.indicator);

            return false;
        });

        addEventHandler(drop, 'click', function (e)
        {
            addEventHandler(inputFile, 'change', fileChanged);
            inputFile.click();
            return false;
        });

        addEventHandler(iconContainer, 'click', function (e)
        {
            name.innerHTML = "";
            $scope.deleteFile(attrs.prop, attrs.indicator);
            return false;
        });
        addEventHandler(iconContainer, 'mouseover', function (e)
        {
            fileIcon.style.opacity = 0;
            deleteIcon.style.opacity = 1;
            return false;
        });
        addEventHandler(iconContainer, 'mouseleave', function (e)
        {
            fileIcon.style.opacity = 1;
            deleteIcon.style.opacity = 0;

            return false;
        });


        function fileChanged(e)
        {
            name.innerHTML = e.srcElement.files[0].name;
            $scope.onFileAdded(e.srcElement.files[0], attrs.prop, attrs.indicator);
            this.value = null;
            removeEventHandler(inputFile, 'change', fileChanged);
            return false;
        }


        function addEventHandler(obj, evt, handler)
        {
            if (obj.addEventListener)
            {
                // W3C method
                obj.addEventListener(evt, handler, false);
            } else if (obj.attachEvent)
            {
                // IE method.
                obj.attachEvent('on' + evt, handler);
            } else
            {
                // Old school method.
                obj['on' + evt] = handler;
            }
        }

        function removeEventHandler(obj, evt, handler)
        {
            if (obj.removeEventListener)
            {
                // W3C method
                obj.removeEventListener(evt, handler, false);
            } else if (obj.detachEvent)
            {
                // IE method.
                obj.detachEvent('on' + evt, handler);
            } else
            {
                // Old school method.
                obj['on' + evt] = handler;
            }
        }

        function cancel(e)
        {
            if (e.preventDefault)
            {
                e.preventDefault();
            }
            return false;
        }
    };
});

function dropArea(drop, onFileAdded)
{
    //var drop = document.getElementById(id);


}





