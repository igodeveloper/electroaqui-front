/**
 * Modulo controlador para la crearción de recursos areas retencion
 * @table    fact_areas_retencion
 * @class
 * @name     kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js
 *
 * @mail     <a href="mailto:ivan.gomez@konecta.com.py"/>
 * @author   <a iván gomez</>
 */
/**
 * Se define el controller y sus dependencias.
 */
app.controller('VerFacturasController', [
    '$scope', '$route', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', 'BaseServices', '$args',

    function($scope, $route, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, BaseServices, $args) {

        /**
         *  Objeto  que almacena los filtros obtenidos del formulario
         *  @public
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.module.facturacion.js.controllers.crear-areas-retencion-controller.js#datos
         */
        $scope.titulo = 'Facturas';
        $scope.detalle = [];
        $scope.fac = {};
        $scope.fac.totalFactura = 0;

        /**
         *  Objeto de configuración del alert Success
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.js.directives.directivas-bases.ui-alert-directives#alertSuccessConfig
         */
        $scope.alertSuccessConfig = {
            type: 'success',
            scroll: true,
            closeable: true,
            timeout: 10000
        };

        /**
         *  Objeto de configuración del alert Warning
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.js.directives.directivas-bases.ui-alert-directives#alertWarningConfig
         */
        $scope.alertWarningConfig = {
            type: 'warning',
            scroll: true,
            closeable: true,
            timeout: 10000
        };

        /**
         *  Objeto de configuración del alert Error
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.js.directives.directivas-bases.ui-alert-directives#alertErrorConfig
         */
        $scope.alertErrorConfig = {
            type: 'danger',
            scroll: true,
            closeable: true,
            timeout: 10000
        };

        /**
         *  Objeto que representa al servicio de administración del alert de errores y success
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.js.directives.directivas-bases.ui-alert-directives#alerServices
         */
        $scope.alertErrorServices = alertServices.getInstance();
        $scope.alertWarningServices = alertServices.getInstance();
        $scope.alertSuccesServices = alertServices.getInstance();
        /**
         * Objeto de configuración de la directiva ui-blockui
         * @type {Object}
         * @name kml3-frontend.js.directives.directivas-bases.ui-blockui-directives#uiBlockuiConfig
         */
        $scope.uiBlockuiConfig = {
            'bloquear': false
        };
        /**
         * Función que realiza la navegación al cancelar la operación
         * @function cancelar()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.crear-areas-retencion-controller.js#cancelar
         */
        $scope.cancelar = function() {
            $location.path('/facturas')
        };
        $scope.clientes = function() {
            angular.forEach($scope.clientesLista, function(value, key) {
                if (value.id == $scope.fac.idCliente) {
                    $scope.fac.direccion = value.direccion;
                    $scope.fac.ruc = value.documento;
                    $scope.fac.documento = value.documento;
                    $scope.fac.telefono = value.telefono;
                }
            });
        };

        $scope.getListas = function(path, lista, obj) {
            var url = path + '/';

            BaseServices.getAll(url, obj, -1).then(
                function(response) {
                    if (response.status == 200) {
                        $scope[lista] = response.data;
                    } else {
                        $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                            "Ha ocurrido un error, inténtelo nuevamente mas tarde.");
                    }
                }
            );
        };
        $scope.getFactura = function(id) {
            var url = 'facturas/' + id;
            $scope.uiBlockuiConfig.bloquear = true;
            BaseServices.get(url).then(
                function(response) {
                    if (response.status == 200) {
                        $scope.fac = response.data;
                    } else {
                        $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                            "Ha ocurrido un error, inténtelo nuevamente mas tarde.");
                    }
                }
            );
            $scope.uiBlockuiConfig.bloquear = false;
        };
        $scope.launch = function(which) {
            var dlg = null;
            switch (which) {

                case 'pagare':
                    dlg = $dialogs.create(
                        'partials/modales/pagare-modal.html',
                        'PagareController', $scope.fac, {
                            key: false,
                            back: 'static'
                        }
                    );
                    dlg.result.then(function() {
                        $scope.cancelar();
                    });
                    break;
                case 'chequera':
                    dlg = $dialogs.create(
                        'partials/modales/chequera-modal.html',
                        'ChequeraController', $scope.fac, {
                            key: false,
                            back: 'static'
                        }
                    );
                    dlg.result.then(function() {
                        $scope.cancelar();
                    });
                    break;
                case 'generarCuota':
                    Navigator.goTo($location.path('/facturas/cuotas'), {
                        dataM: $scope.fac
                    });
                    break;
                case 'cancelar':
                    $scope.cancelar();

            }; // end switch
        };
        $scope.init = function() {
            /**
             *  Objeto que donde se almacena los dato ingresados en los formularios
             *  @type {Object}
             *  @field
             */
            $scope.getListas('clientes', 'clientesLista', {});
            $scope.getListas('productos', 'productosLista', {});

            if ($args) {
                /**
                 *  Objeto  que almacena los filtros obtenidos del formulario
                 *  @public
                 *  @type {Object}
                 *  @field
                 *  @name kml3-frontend.js.controllers.modificar-rubros-controller
                 */
                $scope.fac = $args.dataM;
                // $scope.getFactura($args.dataM.id);
                $scope.fac.facturas = $args.dataM.talonario + "-" + ("0000000" + $args.dataM.numeroComprobante).slice(-7);
                $scope.clientes();
                $scope.getListas('facturas-detalle', 'detalle', {
                    idFacturas: $args.dataM.id
                });
            } else {
                $scope.cancelar();
            }

        };
        $scope.init();

    }
]);