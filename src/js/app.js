app.config(['$routeProvider', '$controllerProvider',
    '$compileProvider', '$filterProvider', '$provide', '$httpProvider',

    function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

        /*
         * Se registran las referencias  a los componentes en el
         * atributo 'register' del módulo. Es utilizado para
         * implementar el lazy load de los módulos.
         */
        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        };

		$provide.factory('Auth', function() {
            return window.authFactory;
        });

        /*
         *
         * Mapemos los controladores a los templates
         */
        $routeProvider.when('/', {
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController',
            titulo: 'Modulo Ejemplo'
        });

        /* 
         * GENERALES
         */
        $routeProvider.otherwise({
            redirectTo: '/404'
        });    

        /***********************************************************************
         Ejemplos
         ***********************************************************************/
        $routeProvider.when('/ciudades', {
            templateUrl: 'partials/ciudades/ciudades-partial.html',
            controller: 'CiudadesController',
            titulo: 'ciudades'

        });

        $routeProvider.when('/ciudades/agregar', {
            templateUrl: 'partials/ciudades/crear-ciudades-partial.html',
            controller: 'CrearCiudadesController',
            titulo: 'ciudades'

        });

        $routeProvider.when('/ciudades/modificar', {
            templateUrl: 'partials/ciudades/modificar-ciudades-partial.html',
            controller: 'ModificarCiudadesController',
            titulo: 'ciudades'

        });
        /***********************************************************************
         Cabecera
         ***********************************************************************/
        $routeProvider.when('/cabecera', {
            templateUrl: 'partials/cabecera/cabecera-partial.html',
            controller: 'CabeceraController',
            titulo: 'cabecera'

        });

        $routeProvider.when('/cabecera/agregar', {
            templateUrl: 'partials/cabecera/crear-cabecera-partial.html',
            controller: 'CrearCabeceraController',
            titulo: 'cabecera'

        });

        $routeProvider.when('/cabecera/modificar', {
            templateUrl: 'partials/cabecera/modificar-cabecera-partial.html',
            controller: 'ModificarCabeceraController',
            titulo: 'cabecera'

        });
        
        /***********************************************************************
         detalle1
         ***********************************************************************/
        
         $routeProvider.when('/cabecera/agregar-detalle-0', {
            templateUrl: 'partials/cabecera/detalle1/crear-detalle1-partial.html',
            controller: 'CrearDetalle1Controller',
            titulo: 'Detalle 1'

        });

        $routeProvider.when('/cabecera/modificar-detalle-0', {
            templateUrl: 'partials/cabecera/detalle1/modificar-detalle1-partial.html',
            controller: 'ModificarDetalle1Controller',
            titulo: 'Detalle 1'

        });
        
        
        $httpProvider.responseInterceptors.push(function($q) {
            return function(promise) {
                return promise.then(function(response) {
                    return response;
                }, function(response) {
                    MasterUtils.redirectError(response.status);
                    response = MasterUtils.processResponse(response);
                    return $q.reject(response);
                });
            };
        });

        /*$httpProvider.interceptors.push(function($q, Auth) {
            return {
                request: function(config) {
                    var deferred = $q.defer();
                    if (Auth.authz.token) {
                        Auth.authz.updateToken(5).success(function() {
                            config.headers = config.headers || {};
                            config.headers.Authorization = 'Bearer ' + Auth.authz.token;
                            config.headers.usuario = Auth.authz.idTokenParsed.preferred_username;
                            deferred.resolve(config);
                        }).error(function() {
                            deferred.reject('Failed to refresh token');
                        });
                    }
                    return deferred.promise;
                }
            };
        });*/

    }
]);
/**
 * Utilizado para paso de parametro entre controller
 */
app.value("tempStorage", {}).service("Navigator", function($location, tempStorage) {
    return {
        /**
         * @param   url
         * @param   args Parametros
         * @return
         */
        goTo: function(url, args) {
            tempStorage.args = args;
            $location.path(url);
        }
    };
});
app.run(['$rootScope', '$location', 'tempStorage', 'Auth',
    /**tempStorage  agregar en app.run como dependencia
	 /************************************************************2do**********************************************/

    function($rootScope, $location, tempStorage, Auth) {
        /**
         * Utilizado para paso de parametro entre controller
         */
        $rootScope.$on('$routeChangeSuccess', function(evt, current, prev) {
            current.locals.$args = tempStorage.args;
            tempStorage.args = null;
        });
        /**********************************************2do*************************************************************/



        $rootScope.$on("$routeChangeStart", function(event, next, current) {

            if ($location.path() == "/") {
                mostrarMenu();
            } else {
                ocultarMenu();
            }
        });

        /*$rootScope.isAuthorized = function(rol) {
            return Auth.authz.hasResourceRole(rol, 'modulo-ejemplo');
        }*/

        $rootScope.logout = function() {
           /* Auth.loggedIn = false;
            var redirect = Auth.logoutUrl;
            Auth.authz = null;
            window.location = redirect;*/
        };
    }
]);