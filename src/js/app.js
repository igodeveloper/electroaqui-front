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

        $routeProvider.when('/', {
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController',
            titulo: 'Celle Cars'
        });
        $routeProvider.when('/login', {
            templateUrl: 'partials/login-tmpl.html',
            controller: 'LoginController'
        });

        $routeProvider.otherwise({
            redirectTo: '/404'
        });



        $routeProvider.when('/clientes', {
            templateUrl: 'partials/clientes/clientes-partial.html',
            controller: 'ClientesController',
            titulo: 'Clientes'

        });

        $routeProvider.when('/clientes/agregar', {
            templateUrl: 'partials/clientes/crear-clientes-partial.html',
            controller: 'CrearClientesController',
            titulo: 'Agregar'

        });

        $routeProvider.when('/clientes/modificar', {
            templateUrl: 'partials/clientes/modificar-clientes-partial.html',
            controller: 'ModificarClientesController',
            titulo: 'Modificar'

        });

        $routeProvider.when('/marcas', {
            templateUrl: 'partials/marcas/marcas-partial.html',
            controller: 'MarcasController',
            titulo: 'Marcas'

        });

        $routeProvider.when('/marcas/agregar', {
            templateUrl: 'partials/marcas/crear-marcas-partial.html',
            controller: 'CrearMarcasController',
            titulo: 'Agregar'

        });

        $routeProvider.when('/marcas/modificar', {
            templateUrl: 'partials/marcas/modificar-marcas-partial.html',
            controller: 'ModificarMarcasController',
            titulo: 'Modificar'

        });

        $routeProvider.when('/tipo-productos', {
            templateUrl: 'partials/tipo-productos/tipo-productos-partial.html',
            controller: 'TipoProductosController',
            titulo: 'Tipo Productos'

        });

        $routeProvider.when('/tipo-productos/agregar', {
            templateUrl: 'partials/tipo-productos/crear-tipo-productos-partial.html',
            controller: 'CrearTipoProductosController',
            titulo: 'Agregar'

        });

        $routeProvider.when('/tipo-productos/modificar', {
            templateUrl: 'partials/tipo-productos/modificar-tipo-productos-partial.html',
            controller: 'ModificarTipoProductosController',
            titulo: 'Modificar'

        });

        $routeProvider.when('/productos', {
            templateUrl: 'partials/productos/productos-partial.html',
            controller: 'ProductosController',
            titulo: 'Productos'

        });

        $routeProvider.when('/productos/agregar', {
            templateUrl: 'partials/productos/crear-productos-partial.html',
            controller: 'CrearProductosController',
            titulo: 'Agregar'

        });

        $routeProvider.when('/productos/modificar', {
            templateUrl: 'partials/productos/modificar-productos-partial.html',
            controller: 'ModificarProductosController',
            titulo: 'Modificar'

        });

        $routeProvider.when('/facturas', {
            templateUrl: 'partials/facturas/facturas-partial.html',
            controller: 'FacturasController',
            titulo: 'Facturas'

        });

        $routeProvider.when('/facturas/agregar', {
            templateUrl: 'partials/facturas/crear-facturas-partial.html',
            controller: 'CrearFacturasController',
            titulo: 'Facturar'

        });

        $routeProvider.when('/facturas/consultar', {
            templateUrl: 'partials/facturas/ver-facturas-partial.html',
            controller: 'VerFacturasController',
            titulo: 'Consultar'

        });
        $routeProvider.when('/facturas/cuotas', {
            templateUrl: 'partials/facturas/cuotas-facturas-partial.html',
            controller: 'CuotasFacturasController',
            titulo: 'Cuotas'

        });

        $routeProvider.when('/chequera', {
            templateUrl: 'partials/chequera/chequeras-partial.html',
            controller: 'ChequerasController',
            titulo: 'Chequera'

        });
        $routeProvider.when('/chequera/cobrar', {
            templateUrl: 'partials/chequera/cobrar-chequeras-partial.html',
            controller: 'CobrarChequerasController',
            titulo: 'Cobrar'

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
app.run(['$rootScope', '$location', 'tempStorage',
    function($rootScope, $location, tempStorage) {
        /**
         * Utilizado para paso de parametro entre controller
         */
        $rootScope.$on('$routeChangeSuccess', function(evt, current, prev) {
            current.locals.$args = tempStorage.args;
            tempStorage.args = null;
        });

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if (!sessionStorage.getItem('userToken')) {
                $location.path("/login");
            }
        });

        $rootScope.logout = function() {
            sessionStorage.clear();
            var redirect = auth.logoutUrl;
            window.location = redirect;
        };


        $rootScope.esLogin = function() {
            if ($location.path() == "/login") {
                return true;
            } else {
                return false;
            }

        };
        $rootScope.habilitarMenu = function(aplicacion, rolPorDefecto) {
            return true;
        };
        $rootScope.habilitarSubMenu = function(rol) {
            return Auth.authz.hasResourceRole(rol, 'postventa');
            //return true;
        };

    }
]);