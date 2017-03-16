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
 * Se dfine el controller y sus dependencias.
 */
app.controller('CobrarChequerasController', [
    '$scope', '$route', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', '$args', 'BaseServices',
    function ($scope, $route, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, $args, BaseServices) {
        $scope.titulo = 'Chequera';
        $scope.generarBodyData = function (datos) {
            var bodyData = {
                id: datos.id,
                idFactura: datos.idFactura,
                cuota: datos.cuota,
                monto: datos.monto,
                interes: datos.interes,
                montoInteres: datos.montoInteres,
                montoTotal: datos.montoTotal,
                fechaEmision: datos.fechaEmision,
                fechaVencimiento: datos.fechaVencimiento,
                fechaPago: datos.fechaPago,
                idCliente: datos.idCliente,
                estado: datos.estado,
                numeroFiscal: datos.numeroFiscal

            }
            return bodyData;
        };

        $scope.generarParaJSON = function (datos) {
            var bodyData = {
                id: datos.id,
                idFactura: datos.idFactura,
                cuota: datos.cuota,
                monto: datos.monto,
                interes: datos.interes,
                montoInteres: datos.montoInteres,
                montoTotal: datos.montoTotal,
                fechaEmision: datos.fechaEmision,
                fechaVencimiento: datos.fechaVencimiento,
                fechaPago: datos.fechaPago,
                idCliente: datos.idCliente,
                estado: datos.estado,
                numeroFiscal: datos.numeroFiscal
                

            }
            return bodyData;
        };

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
         * Función que es llamada desde la vista al monento de confirmar
         * @function confirmar()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.crear-areas-retencion-controller.js#confirmar
         */
        $scope.confirmar = function () {

            $scope.uiBlockuiConfig.bloquear = true;
            BaseServices.modificar($scope.generarBodyData($scope.datos), 'chequera/')
                .then(
                    function (response) {
                        try {
                            if (response.status === 200) {

                                $scope.bloqueoFormulario = true;

                                dlg = $dialogs.notify("Notificación", "Sus datos se guardaron con éxito!");
                                dlg.result.then(function (btn) {
                                    $route.reload();
                                }, function (btn) {});

                            } else {
                                if (response.data.messages != null) {
                                    $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                                        response.data.messages);
                                } else {
                                    $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                                        "Ha ocurrido un error inesperado, por favor inténtelo más tarde");
                                }
                            }
                        } catch (err) {
                            if (response.data.messages != null) {
                                $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                                    response.data.messages);
                            } else {
                                $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                                    "Ha ocurrido un error inesperado, por favor inténtelo más tarde");
                            }
                        }
                        $scope.uiBlockuiConfig.bloquear = false;
                    }
                );
        };
        /**
         * Función que realiza la navegación al cancelar la operación
         * @function cancelar()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.crear-areas-retencion-controller.js#cancelar
         */
        $scope.cancelar = function () {
            $location.path('/chequera')
        };

        /**
         * Funcion del controller, se encarga de gestionar los accesos a popUps y la vuelta de los
         * mismos.
         * @function launch()
         * @public
         * @param {string}which identificador del popup definido localmente entre la vista y el contralador
         */
        $scope.launch = function (which) {
            var dlg = null;
            switch (which) {

            }; // end switch
        };
        $scope.getListas = function (path, lista, obj) {
            var url = path + '/';

            BaseServices.getAll(url, obj, -1).then(
                function (response) {
                    if (response.status == 200) {
                        $scope[lista] = response.data;
                        if (lista == "detalle") {
                            $scope.datos.cuotas = response.data.length;
                        }
                    } else {
                        $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                            "Ha ocurrido un error, inténtelo nuevamente mas tarde.");
                    }
                }
            );
        };
        $scope.restaFechas = function (f1, f2) {
            var aFecha1 = f1.split('/');
            var aFecha2 = f2.split('/');
            var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
            var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
            var dif = fFecha2 - fFecha1;
            var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
            return dias;
        };
        $scope.calculaInteres = function () {
            var dias = parseInt($scope.datos.diasAtraso) - parseInt($scope.datos.diasGracia);
            if (dias > 0) {
                $scope.datos.montoIntereses = parseInt($scope.datos.monto) * dias * $scope.datos.intereses;

            } else {
                $scope.datos.montoInteres = 0;
            }

            $scope.datos.montoTotal = parseInt($scope.datos.montoTotal) + parseInt($scope.datos.montoInteres);
        };
        /**
         * Función encargada de inicializar la vista al momento de cargar la página
         * @function init()
         * @private
         * @name kml3-frontend.js.controllers.modificar-rubros-controller#init
         */
        $scope.init = function () {
            /**
             *  Objeto que donde se almacena los dato ingresados en los formularios
             *  @type {Object}
             *  @field
             */
            if ($args) {
                $scope.getListas('clientes', 'clientesLista', {});
                /**
                 *  Objeto  que almacena los filtros obtenidos del formulario
                 *  @public
                 *  @type {Object}
                 *  @field
                 *  @name kml3-frontend.js.controllers.modificar-rubros-controller
                 */
                $scope.datos = $args.dataM;
                console.log($scope.datos);
                var hoy = new Date();
                var dif = $scope.restaFechas($filter('date')(new Date($args.dataM.fechaVencimiento), 'dd/MM/yyyy'), $filter('date')(new Date(hoy), 'dd/MM/yyyy'));
                $scope.datos.fechaPago = new Date($args.dataM.fechaPago);
                if($scope.datos.estado == "PENDIENTE"){
                    $scope.datos.estado = 'PAGADO';
                }
                if (dif > 0) {
                    $scope.datos.diasAtraso = parseInt(dif);
                    $scope.datos.intereses = 0.0001;
                    
                } else {
                    $scope.datos.diasAtraso = parseInt(0);
                }
            } else {
                $scope.cancelar();
            }

        };
        //se invoca a la función de inicialización
        $scope.init();
    }
]);