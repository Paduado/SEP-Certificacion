'use strict';
var creds = {};

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'myApp.version',
        'sidebarMenu',
        'topBar',
        'myApp.login',
        'myApp.signup',
        'myApp.verify',
        'myApp.profile',
        'myApp.myapps',
        'myApp.apps',
        'myApp.new',
        'ngMaterial',
        'ngMessages',
        'ngDroplet',
        'md.data.table'
    ])
    .config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.otherwise({redirectTo: '/applications/search'});
    }])
    .config(function ($mdThemingProvider)
    {
        var customPrimary = {
            '50': '#96ca98',
            '100': '#85c187',
            '200': '#74b976',
            '300': '#63b066',
            '400': '#54a657',
            '500': '#4b954e',
            '600': '#428445',
            '700': '#3a733c',
            '800': '#316233',
            '900': '#29512a',
            'A100': '#a7d2a8',
            'A200': '#b7dbb9',
            'A400': '#c8e4ca',
            'A700': '#204022',
            'contrastDefaultColor': 'light'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#737373',
            '100': '#666666',
            '200': '#595959',
            '300': '#4d4d4d',
            '400': '#404040',
            '500': '#333',
            '600': '#262626',
            '700': '#1a1a1a',
            '800': '#0d0d0d',
            '900': '#000000',
            'A100': '#808080',
            'A200': '#8c8c8c',
            'A400': '#999999',
            'A700': '#000000'
        };

        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent');
    })
    .factory('focus', function ($timeout, $window)
    {
        return function (id)
        {
            // timeout makes sure that it is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function ()
            {
                var element = $window.document.getElementById(id);
                if (element)
                    element.focus();
            });
        };
    })
    .directive('eventFocus', function (focus)
    {
        return function (scope, elem, attr)
        {
            elem.on(attr.eventFocus, function ()
            {
                focus(attr.eventFocusId);
            });

            // Removes bound events in the element itself
            // when the scope is destroyed
            scope.$on('$destroy', function ()
            {
                elem.off(attr.eventFocus);
            });
        };
    })
    .run(["$rootScope", "$location", "$mdDialog", function ($rootScope, $location, $mdDialog)
    {
        $rootScope.$on( "$routeChangeStart", function(event, next, current)
        {
            if(localStorage.getItem("userIsLoggedIn") === null)
            {
                $rootScope.userType = 0;
                console.log(next.redirectTo);
                console.log(next.templateUrl);
                if((next.templateUrl != "login/login.html")&&(next.templateUrl != "signup/signup.html")&&(next.templateUrl != "verify/verify.html"))
                {
                    $location.path("/login");
                }
            }
            else
            {
                if("false" == localStorage.getItem("userProfileIsComplete"))
                {
                    $rootScope.tab = 3;
                    if(next.templateUrl != "sections/profile/profile.html")
                    {
                        $location.path("/profile");
                    }
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('body')))
                        .title('Por favor, actualiza tus datos!')
                        .textContent("")
                        .ariaLabel('Update User Data')
                        .ok('OK')
                    );
                }
                else
                {
                    $rootScope.userType = localStorage.getItem("userType");
                    if((next.templateUrl == "login/login.html")||(next.templateUrl == "signup/signup.html")||(next.templateUrl == "signup/verify.html"))
                    {
                        $location.path("/applications/search");
                    }
                }
            }
        });
    }]);

AWS.config.region = 'us-east-1'; // Region
if(localStorage.getItem("userIsLoggedIn") === null)
{
    var creds = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:3739a41c-3af8-47ec-a594-b33f602815c9'
    });
    AWS.config.credentials = creds;
}
else
{
    var creds = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:3739a41c-3af8-47ec-a594-b33f602815c9'
    });
    AWS.config.credentials = creds;

    creds.params.IdentityPoolId = localStorage.getItem("identityPoolID");
    creds.params.IdentityId = localStorage.getItem("identityID");
    creds.params.Logins = {
        'cognito-identity.amazonaws.com': localStorage.getItem("token")
    };
    creds.expired = true;
    AWS.config.credentials.get(function(err)
    {
        if(err)
        {
            //Token Expired
            console.log(err, err.stack);
            localStorage.clear();
            location.reload();
        }
    });
}

var options = {
    appId : 'bef1447450494562953788476c2d0719', //Amazon Mobile Analytics App ID
    appTitle : "SEPCertificacion",
    appVersionName : "0.1",
    appVersionCode : "1",
    appPackageName : "sep.smartplace.mx"
};

var mobileAnalyticsClient = new AMA.Manager(options);

mobileAnalyticsClient.submitEvents();