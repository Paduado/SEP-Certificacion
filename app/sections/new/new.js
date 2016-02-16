'use strict';

angular.module('myApp.new', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/new', {
            templateUrl: 'sections/new/new.html', controller: 'NewCtrl'
        });
    }])
    .controller('NewCtrl', function ($scope, $mdDialog)
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
            number: "",
            file1: "",
            file2: "",
            file3: ""
        };

        $scope.profiles = [{
            profType: 1, levelType: 1, profile: "Secundaria"
        }, {
            profType: 2, levelType: 2, profile: "Bachillerato"
        }, {
            profType: 3, levelType: 3, profile: "Piloto Aviador"
        }, {
            profType: 3, levelType: 3, profile: "Policía Investigador"
        }, {
            profType: 3, levelType: 4, profile: "Comercialización inmobiliaria"
        }, {
            profType: 4, levelType: 3, profile: "Comercio"
        }, {
            profType: 4, levelType: 3, profile: "Negocios Internacionales"
        }, {
            profType: 4, levelType: 4, profile: "Mercadotécnia"
        }, {
            profType: 4, levelType: 4, profile: "Pedagogía"
        }, {
            profType: 4, levelType: 4, profile: "Ciencias de la Educación"
        }, {
            profType: 4, levelType: 4, profile: "Turismo"
        }, {
            profType: 5, levelType: 4, profile: "Administración"
        }, {
            profType: 5, levelType: 4, profile: "Informática"
        }, {
            profType: 6, levelType: 4, profile: "Actuaría"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Agronómica"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Civil"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Eléctrica"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Electrónica"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Industrial"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Mecánica"
        }, {
            profType: 6, levelType: 4, profile: "Ingeniería Mecánica-Eléctrica"
        }, {
            profType: 6, levelType: 4, profile: "Derecho"
        }, {
            profType: 6, levelType: 4, profile: "Contaduría"
        }, {
            profType: 7, levelType: 4, profile: "Matemáticas"
        }, {
            profType: 7, levelType: 4, profile: "Ingeniería Computacional"
        }, {
            profType: 7, levelType: 4, profile: "Ingeniería Mecatrónica"
        }, {
            profType: 7, levelType: 4, profile: "Ingeniería de Software"
        }, {
            profType: 7, levelType: 4, profile: "Ingeniería Topográfica"
        }, {
            profType: 7, levelType: 4, profile: "Ciencias de la Comunicación"
        }, {
            profType: 7, levelType: 4, profile: "Economía"
        }, {
            profType: 7, levelType: 4, profile: "Sociología"
        }, {
            profType: 7, levelType: 4, profile: "Cinematografía"
        }, {
            profType: 7, levelType: 4, profile: "Diseño"
        }, {
            profType: 7, levelType: 4, profile: "DiseñoPublicidad en Moda"
        }, {
            profType: 7, levelType: 4, profile: "Filosofía"
        }, {
            profType: 7, levelType: 4, profile: "Historia"
        }, {
            profType: 7, levelType: 4, profile: "Educación Primaria"
        }, {
            profType: 7, levelType: 4, profile: "Educación Indígena"
        }, {
            profType: 7, levelType: 4, profile: "Ciencias Computacionales"
        }, {
            profType: 8, levelType: 4, profile: "Educación preescolar"
        }, {
            profType: 9, levelType: 5, profile: "Actuación"
        }, {
            profType: 9, levelType: 5, profile: "Cinematografía"
        }, {
            profType: 9, levelType: 5, profile: "Administración"
        }, {
            profType: 9, levelType: 5, profile: "Administración Pública"
        }, {
            profType: 9, levelType: 5, profile: "Ciencias Religiosas"
        }, {
            profType: 9, levelType: 5, profile: "Teología"
        }, {
            profType: 9, levelType: 5, profile: "Interpretación"
        }, {
            profType: 9, levelType: 5, profile: "Comercio Exterior y Aduanas"
        }, {
            profType: 9, levelType: 5, profile: "Dirección Orquestal"
        }, {
            profType: 9, levelType: 5, profile: "Educación Preescolar"
        }, {
            profType: 9, levelType: 5, profile: "Educación Primaria"
        }];

        $scope.progress1 = 0;
        $scope.progress2 = 0;
        $scope.progress3 = 0;



        $scope.genderChanged = function ()
        {
            console.log($scope);
            $scope.application.subgender = undefined;
        };

        $('#birthdate').datepicker({
            changeMonth: true, changeYear: true, onSelect: function (date)
            {
                var scope = angular.element($('#birthdate')).scope();
                scope.$apply(function ()
                {
                    scope.application.birthdate = date;
                });
            }
        });

        $scope.applicationIncomplete = function ()
        {
            return $scope.form.$invalid || $scope.application.file1 == "" || $scope.application.file2 == "" || $scope.application.file3 == "";
        };

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
                    $mdDialog.show($mdDialog.alert()
                        .parent(angular.element(document.querySelector('body')))
                        .clickOutsideToClose(true)
                        .title('Error al subir la solicitud')
                        .textContent('Alguno de los campos esta vacio o con un formato erroneo.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Aceptar'));
                    console.log(err);
                } else
                {
                    $mdDialog.show($mdDialog.alert()
                        .parent(angular.element(document.querySelector('body')))
                        .clickOutsideToClose(true)
                        .title('Solicitud dada de alta')
                        .textContent('Aparecerá en el area de pendientes para su revisión.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Aceptar'));
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
                    $scope.application[prop] = data.Location;
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
            $scope.application[prop] = "";
            $scope[indicator] = 0;
            $scope.$digest()
        }

    }).directive('dropfile', function ($compile)
{
    return function ($scope, element, attrs)
    {
        var drop = element[0].getElementsByClassName('dropzone')[0];
        var iconContainer = element[0].getElementsByClassName('file-icon-container')[0];
        var fileIcon = iconContainer.getElementsByClassName('file-icon')[0];
        var deleteIcon = iconContainer.getElementsByClassName('delete-icon')[0];
        var name = element[0].getElementsByClassName('name')[0];
        var inputFile = document.getElementById('input-file');

        addEventHandler(drop, 'dragover', cancel);
        addEventHandler(drop, 'dragenter', cancel);
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
            inputFile.dataset.prop = attrs.prop;
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

        addEventHandler(inputFile, 'change', function (e)
        {
            if (this.dataset.prop == attrs.prop)
            {
                name.innerHTML = e.srcElement.files[0].name;
                $scope.onFileAdded(e.srcElement.files[0], attrs.prop, attrs.indicator);
            }
            return false;
        });


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






