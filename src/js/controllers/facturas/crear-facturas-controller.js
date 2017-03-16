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
app.controller('CrearFacturasController', [
    '$scope', '$route', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', 'BaseServices',
    function($scope, $route, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, BaseServices) {

        /**
         *  Objeto  que almacena los filtros obtenidos del formulario
         *  @public
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.module.facturacion.js.controllers.crear-areas-retencion-controller.js#datos
         */
        $scope.datos = {};
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
         * Función que es llamada desde la vista al monento de confirmar
         * @function confirmar()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.crear-areas-retencion-controller.js#confirmar
         */
        $scope.confirmar = function() {
            $scope.uiBlockuiConfig.bloquear = true;
            var obj = $scope.getJsonFormater();
            BaseServices.insertar(obj, 'facturas/')
                .then(
                    function(response) {
                        try {
                            if (response.status === 201) {

                                $scope.bloqueoFormulario = true;

                                dlg = $dialogs.notify("Notificación", "Sus datos se guardaron con éxito!");
                                dlg.result.then(function(btn) {
                                    Navigator.goTo($location.path('/facturas/consultar'), {
                                        dataM: response.data
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
                    $scope.fac.fecha = new Date();
                }
            });
        };
        $scope.detalles = function() {
            angular.forEach($scope.productosLista, function(value, key) {
                console.log(value);
                if (value.id == $scope.det.producto) {
                    $scope.det.descripcion = value.descripcion;
                    $scope.det.precio = value.precioLista;
                }
            });
        };

        $scope.getListas = function(path, lista) {
            var url = path + '/';
            BaseServices.getAll(url, {}, -1).then(
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
        $scope.agregarDetalle = function() {
            if ($scope.det.cantidad == null || $scope.det.producto == null || $scope.det.producto == "" || $scope.det.precio == null) {
                $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                    "Debe setear la cantidad, el producto y el precio para agregar un producto");
            } else {
                var obj = {
                    cantidad: $scope.det.cantidad,
                    idProducto: $scope.det.producto,
                    idImpuesto: 1,
                    descripcion: $scope.det.descripcion,
                    montoUnitario: $scope.det.precio,
                    montoTotal: $scope.det.precio * $scope.det.cantidad

                }
                $scope.fac.totalFactura = $scope.fac.totalFactura + obj.montoTotal;
                $scope.fac.totalIva = 0;
                $scope.fac.totalExcenta = 0;
                $scope.detalle.push(obj);
                MasterUtils.deleteValues($scope.det);
            }

        };
        $scope.removeItem = function(index) {
            //  $scope.fac.totalFactura = parseInt($scope.fac.totalFactura) - parseInt($scope.detalle[index].total);

            $scope.detalle.splice(index, 1);
            $scope.fac.totalFactura = 0;
            angular.forEach($scope.detalle, function(value, key) {
                $scope.fac.totalFactura = +parseInt(value.montoTotal);
            });

        };
        $scope.getJsonFormater = function(index) {
            var factura = {
                talonario: $scope.fac.talonario,
                numeroComprobante: $scope.fac.numeroComprobante,
                idCliente: $scope.fac.idCliente,
                total: $scope.fac.totalFactura,
                totalIva: $scope.fac.totalIva,
                totalExcenta: $scope.fac.totalExcenta,
                idEstado: 3,
                condicion: "CT",
                chequera: "N",
                fechaFactura: new Date()
            }
            var detalle = $scope.detalle;
            for (i = 0; i < detalle.length; i++) {
                delete detalle[i].descripcion;
            }
            factura.detalle = detalle;
            return factura;


        };

        $scope.getListas('clientes', 'clientesLista');
        $scope.getListas('productos', 'productosLista');
    }
]);