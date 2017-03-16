/**
 * Modulo controlador para la administración de la página de areas retencion
 * @table    fact_areas_retencion
 * @class
 * @name     kml3-frontend.module.facturacion.js.controllers.productos-controller.js
 *
 * @mail     <a href="mailto:ivan.gomez@konecta.com.py"/>
 * @author   <a iván gomez</>
 */
app.controller('ProductosController', [
    '$scope', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', 'BaseServices',
    function($scope, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, BaseServices) {

        /**
         *  Objeto  que almacena los filtros obtenidos del formulario
         *  @public
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#datos
         */
        $scope.datos = {};
        //$scope.totalGrilla = 0;

        $scope.generarBodyData = function(datos) {
            var bodyData = {
                id: datos.id,
                idTipoProducto: datos.idTipoProducto,
                idMarcas: datos.idMarcas,
                caracteristicas: datos.caracteristicas,
                descripcion: datos.descripcion,
                precioFinal: datos.precioFinal,
                precioLista: datos.precioLista,
                costo: datos.costo,
                factorVenta: datos.factorVenta,
                filtrado: datos.filtrado
            }
            return bodyData;
        };

        $scope.generarParaJSON = function(datos) {
            var bodyData = {
                id: datos.id,
                idTipoProducto: datos.idTipoProducto,
                idMarcas: datos.idMarcas,
                caracteristicas: datos.caracteristicas,
                descripcion: datos.descripcion,
                precioFinal: datos.precioFinal,
                precioLista: datos.precioLista,
                costo: datos.costo,
                factorVenta: datos.factorVenta,
                filtrado: datos.filtrado
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
         * url para de los servicios RESTful
         * @type {String}
         * @public
         */
        var urlAccess = MasterUrl.serviceRest + 'productos/';

        /**
         *  Objeto de configuración de la directiva jqgrid
         *  @type {Object}                 
         *  @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#jqgridConfig
         *  @public
         */
        var jqgridConfig = {
            url: urlAccess,
            datatype: "local",
            height: "auto",
            shrinkToFit: true,
            autowidth: true,
            rowNum: 10,
            rowList: [],
            postData: {
                cantidad: function() {
                    return $scope.tableParams.getGridParam("rowNum");
                },
                inicio: function() {
                    return $scope.tableParams.getRowsStart();
                },
                orderBy: "id",
                orderDir: "ASC"
            },
            colModel: [{
                    label: "Id",
                    name: "id",
                    index: "id",
                    width: 50,

                    hidden: false
                },{
                    label: "Proveedor",
                    name: "proveedor",
                    index: "proveedor",
                    align:"left",
                    width: 120,
                    hidden: false
                },
                {
                    label: "idTipoProducto",
                    name: "idTipoProducto",
                    index: "idTipoProducto",
                    width: 50,
                    hidden: true
                },
                {
                    label: "Tipo Producto",
                    name: "tipoProducto",
                    index: "tipoProducto",
                    width: 150,
                    hidden: false,
                    formatter: function(cellvalue, options, rowObject) {
                        var texto = 'No Disponible';
                        angular.forEach($scope.tipoProductoLista, function(value, key) {
                            if (value.id == rowObject.idTipoProducto)
                                texto = value.descripcion;

                        });
                        return texto;
                    }
                },
                {
                    label: "idMarcas",
                    name: "idMarcas",
                    index: "idMarcas",
                    width: 50,
                    hidden: true
                },
                {
                    label: "Marcas",
                    name: "marcas",
                    index: "marcas",
                    width: 150,
                    hidden: false,
                    formatter: function(cellvalue, options, rowObject) {
                        var texto = 'No Disponible';
                        angular.forEach($scope.marcasLista, function(value, key) {
                            if (value.id == rowObject.idTipoProducto)
                                texto = value.descripcion;

                        });
                        return texto;
                    }
                },
                {
                    label: "Caracteristicas",
                    name: "caracteristicas",
                    index: "caracteristicas",
                    align: "left",
                    width: 250,

                    hidden: true
                },
                {
                    label: "Descripción",
                    name: "descripcion",
                    index: "descripcion",
                    align: "left",
                    width: 280,

                    hidden: false
                }, {
                    label: "Costo",
                    name: "costo",
                    index: "costo",
                    align: "right",
                    width: 100,
                    hidden: false,
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                },{
                    label: "Costo Oculto",
                    name: "costoOculto",
                    index: "costoOculto",
                    align: "right",
                    width: 100,
                    hidden: false,
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                }, {
                    label: "Factor",
                    name: "factorVenta",
                    index: "factorVenta",
                    align: "right",
                    width: 60,
                    hidden: false,
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 2
                    },
                },
                {
                    label: "Precio Lista",
                    name: "precioLista",
                    index: "precioLista",
                    align: "right",
                    width: 150,
                    hidden: false,
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                },
                {
                    label: "Precio Final",
                    name: "precioFinal",
                    index: "precioFinal",
                    align: "right",
                    width: 150,
                    hidden: false,
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                }

            ],
            jsonReader: {
                repeatitems: false,
                root: "lista",
                total: function(data) {
                    var total = Math.ceil(data.total /
                        $scope.tableParams.getGridParam("rowNum"));
                    return total;
                },
                records: "total",
                id: "Id",
                userdata: "lista"
            },
            emptyrecords: "Sin Datos",
            pager: "#pager",
            viewrecords: true,
            gridview: false,
            hidegrid: false,
            altRows: true,
            loadError: function(xhr, st, err) {
                var response = MasterJqgridUtils.processResponseJqgrid(xhr, $scope.tableParams);
                if (xhr.status !== 404) {
                    $scope.alertErrorServices.addSimpleAlert("operationError", null, response.data.messages);
                    $scope.$apply();
                }
            },
            onSortCol: function(index, iCol, sortorder) {
                $scope.tableParams.setGridParam({
                    postData: {
                        orderBy: index,
                        orderDir: sortorder
                    }
                });
                $scope.disabled = true;
                $scope.$apply();
            },
            onSelectRow: function(id, status, e) {
                $scope.$apply($scope.rowSeleccionado = id);
                $scope.$apply($scope.disabled = false);
            },
            loadComplete: function(cellvalue) {},
            onPaging: function() {}
        };

        /** 
         * Instancia del servicio que administra la tabla jqgrid
         * @type config
         * @public
         */
        $scope.tableParams = new serviciosjqgrid(jqgridConfig);

        /**
         * Funcion del controller, se encarga de gestionar los accesos a popUps y la vuelta de los
         * mismos.
         * @function launch()
         * @public
         * @param {string}which identificador del popup definido localmente entre la vista y el contralador
         */
        $scope.launch = function(which) {
            var dlg = null;
            switch (which) {

                case 'eliminar':
                    dlg = $dialogs.warningConfirm("Por Favor Confirmar", "Esta Seguro que desea eliminar el registro?");
                    dlg.result.then(function(btn) {
                        $scope.eliminar();
                    }, function(btn) {

                    });
                    break;

            }; // end switch
        };

        /**
         * Función que es invocada desde la vista para navegar a otra vista
         * @param path 
         * @function go()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#go
         */
        $scope.go = function(path) {
            $location.path($location.path() + path);
        };

        $scope.filtrado = function() {
            if ($scope.datos.filtrado.length > 3) {
                $scope.buscar();
            }
        };
        /**
         * Función que Modifica un dato seleccionado del jqgrid
         * @function modificar()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#modificar
         */
        $scope.modificar = function() {
            // codigo seleccionado de ejemplo, aqui se le debe pasar el codigo de la fila seleccionada
            if ($scope.rowSeleccionado) {

                var fila = $scope.tableParams.getGridParam("userData")[$scope.rowSeleccionado - 1];

                $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);

                // Navigator utilizado para pasar filtros entre controller
                Navigator.goTo($location.path() + '/modificar', {
                    dataM: fila
                });
            }
        };

        /**
         * Función que es invocada desde la vista para eliminar un recurso
         * @function eliminar ()
         * @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#eliminar
         * @public
         */
        $scope.eliminar = function() {
            $scope.uiBlockuiConfig.bloquear = true;
            if ($scope.rowSeleccionado) {
                $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);

                BaseServices.eliminar($scope.selectedRow.id, 'productos/').then(
                    function(response) {
                        try {
                            if (response.status === 200) {
                                $scope.alertSuccesServices.addSimpleAlert("success", null, "Los datos se eliminaron correctamente");

                                MasterUtils.deleteUndefinedValues($scope.datos);
                                $scope.tableParams.setGridParam({
                                    postData: {
                                        filtros: null
                                    }
                                });
                                $scope.tableParams.reloadGrid();

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
                    }
                );
                $scope.uiBlockuiConfig.bloquear = false;
            }
        };

        /**
         * Función que Limpia datos y pantalla
         * @function limpiar()
         * @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#limpiar
         * @public
         */
        $scope.limpiar = function() {

            MasterUtils.deleteValues($scope.datos);

            $scope.tableParams.setGridParam({
                datatype: "local"
            });
            $scope.tableParams.reloadGrid();

        };

        /**
         * Funcion del controller, que se encarga de listar registros en base a un filtro
         * @param $scope.datos
         * @function buscar()
         * @name kml3-frontend.module.facturacion.js.controllers.productos-controller.js#buscar
         * @public
         */
        $scope.buscar = function() {
            $scope.disabled = true;
            MasterUtils.deleteUndefinedValues($scope.datos);
            /*var post = $scope.tableParams.getGridParam("postData");
            if (angular.toJson(post.filtros) != angular.toJson(JSON.stringify($scope.datos))) {
                $scope.totalGrilla = 0;
            }*/

            $scope.tableParams.setGridParam({
                postData: {
                    filtros: angular.toJson($scope.datos),
                    //total: $scope.totalGrilla
                }
            });
            $scope.tableParams.setGridParam({
                datatype: "json",
                page: "1"
            });
            $scope.tableParams.reloadGrid();
        };

        $scope.marcas = function() {
            var path = 'marcas/';
            BaseServices.getAll(path, {}, -1).then(
                function(response) {
                    if (response.status == 200) {
                        $scope.marcasLista = response.data;
                    } else {
                        $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                            "Ha ocurrido un error, inténtelo nuevamente mas tarde.");
                    }
                }
            );
        };
        $scope.tipoProductos = function() {
            var path = 'tipo-producto/';
            BaseServices.getAll(path, {}, -1).then(
                function(response) {

                    if (response.status == 200) {
                        $scope.tipoProductoLista = response.data;
                    } else {
                        $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                            "Ha ocurrido un error, inténtelo nuevamente mas tarde.");
                    }
                }
            );
        };
        $scope.marcas();
        $scope.tipoProductos();
    }
]);