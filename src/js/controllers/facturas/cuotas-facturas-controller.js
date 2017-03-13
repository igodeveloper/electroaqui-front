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
app.controller('CuotasFacturasController', [
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
        //$scope.fac = {};
        // $scope.fac.totalFactura = 0;
        $scope.datos = {};

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

        $scope.generarCuotas = function() {
            var fecha = new Date();
            var fechaEmision = new Date();
            $scope.limpiar();
            for (var i = 1; i <= $scope.datos.cuotas; i++) {
                var obj = {
                    idFactura: $scope.datos.id,
                    idCliente: $scope.datos.idCliente,
                    cuota: i,
                    monto: $scope.datos.montoCuotas,
                    interes: 0,
                    montoInteres: 0,
                    montoTotal: $scope.datos.montoCuotas,
                    fechaEmision: fechaEmision.setMonth(fechaEmision.getMonth() + 0),
                    fechaVencimiento: fecha.setMonth(fecha.getMonth() + 1),
                    fechaPago: "",
                    estado: "PENDIENTE"
                };
                $scope.detalle.push(obj);
            }
        };

        $scope.getListas = function(path, lista, obj) {
            var url = path + '/';

            BaseServices.getAll(url, obj, -1).then(
                function(response) {
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
        $scope.calculaCuota = function() {
            $scope.datos.montoCuotas = $scope.datos.total / $scope.datos.cuotas;
        };
        $scope.limpiar = function() {
            $scope.detalle = [];
            $scope.cuotas = 1;
        };
        $scope.confirmar = function() {
            $scope.uiBlockuiConfig.bloquear = true;
            var obj = {
                idFactura: $scope.datos.id,
                listaChequera: $scope.detalle
            }
            BaseServices.insertar(obj, 'chequera/cuotas')
                .then(
                    function(response) {
                        try {
                            if (response.status === 201) {

                                $scope.bloqueoFormulario = true;
                                dlg = $dialogs.notify("Notificación", "Sus datos se guardaron con éxito!");
                                $args.dataM.chequera = 'S';
                                $args.dataM.ruc = $scope.datos.ruc;
                                $args.dataM.documento = $scope.datos.documento;
                                $args.dataM.telefono = $scope.datos.telefono;
                                $args.dataM.cliente = $scope.datos.cliente;
                                $args.dataM.idCliente = $scope.datos.idCliente;
                                dlg.result.then(function(btn) {
                                    Navigator.goTo($location.path('/facturas/consultar'), {
                                        dataM: $args.dataM
                                    });
                                }, function(btn) {});

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
        $scope.printIt = function() {
            var table = document.getElementById('cuotas-table').innerHTML;
            var myWindow = window.open('', '', 'width=800, height=600');
            myWindow.document.write(table);
            myWindow.print();
        };

        $scope.chequera = function() {
            $scope.clientes();
            dlg = $dialogs.create(
                'partials/modales/chequera-modal.html',
                'ChequeraController', {
                    detalle: $scope.detalle,
                    cuotas: $scope.datos.cuotas,
                    cliente: $scope.datos.cliente,
                    factura: $scope.datos.factura,
                    totalFactura: $scope.datos.total

                }, {
                    key: false,
                    back: 'static'
                }
            );
            dlg.result.then(function() {
                $scope.cancelar();
            });
        };
        $scope.clientes = function() {
            angular.forEach($scope.clientesLista, function(value, key) {
                if (value.id == parseInt($scope.datos.idCliente)) {
                    $scope.datos.cliente = value.nombre + " " + value.apellido;
                    $scope.datos.ruc = value.documento;
                    $scope.datos.documento = value.documento;
                    $scope.datos.telefono = value.telefono;
                }
            });
        };
        $scope.init = function() {

            if ($args) {
                $scope.getListas('clientes', 'clientesLista', {});
                $scope.datos = $args.dataM;
                $scope.datos.factura = $args.dataM.talonario + "-" + ("0000000" + $args.dataM.numeroComprobante).slice(-7);
                $scope.datos.fechaFactura = new Date($args.dataM.fechaFactura);
                if ($scope.datos.chequera == "S") {
                    $scope.getListas('chequera', 'detalle', { "idFactura": $scope.datos.id });
                } else {
                    $scope.datos.cuotas = 1;
                }
                $scope.calculaCuota();
                $scope.clientes();
            } else {
                $scope.cancelar();
            }

        };
        $scope.init();

    }
]);