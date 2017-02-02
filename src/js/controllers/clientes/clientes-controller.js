/**
 * Modulo controlador para la administración de la página de areas retencion
 * @table    fact_areas_retencion
 * @class
 * @name     kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js
 *
 * @mail     <a href="mailto:ivan.gomez@konecta.com.py"/>
 * @author   <a iván gomez</>
 */
app.controller('ClientesController', [
           '$scope', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', 'BaseServices',
            function ($scope, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, BaseServices) {

        /**
         *  Objeto  que almacena los filtros obtenidos del formulario
         *  @public
         *  @type {Object}
         *  @field
         *  @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#datos
         */
        $scope.titulo = 'Clientes';
        $scope.datos = {};
        //$scope.totalGrilla = 0;

        $scope.generarBodyData = function (datos) {
            var bodyData = {
                id: datos.id,
                nombre: datos.nombre,
                apellido: datos.apellido,
                documento: datos.documento,
                telefono: datos.telefono,
                direccion: datos.direccion,
                email: datos.email
            }
            return bodyData;
        };

        $scope.generarParaJSON = function (datos) {
            var bodyData = {
                id: datos.id,
                nombre: datos.nombre,
                apellido: datos.apellido,
                documento: datos.documento,
                telefono: datos.telefono,
                direccion: datos.direccion,
                email: datos.email
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
        var urlAccess = MasterUrl.serviceRest + 'clientes/';

        /**
         *  Objeto de configuración de la directiva jqgrid
         *  @type {Object}                 
         *  @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#jqgridConfig
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
                cantidad: function () {
                    return $scope.tableParams.getGridParam("rowNum");
                },
                inicio: function () {
                    return $scope.tableParams.getRowsStart();
                },
                orderBy: "id",
                orderDir: "ASC"
            },
            colModel: [
                {
                    label: "Id",
                    name: "id",
                    index: "id",
                    align: 'right',
                    width: 50,
                    hidden: false
                },
                {
                    label: "Nombre",
                    name: "nombre",
                    index: "nombre",
                    align: 'right',
                    width: 200,
                    hidden: false
                },
                {
                    label: "Apellido",
                    name: "apellido",
                    index: "apellido",
                    align: 'right',
                    width: 200,
                    hidden: false
                },
                {
                    label: "Documento",
                    name: "documento",
                    index: "documento",
                    align: "right",
                    width: 200,
                    hidden: false,
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                },
                {
                    label: "Teléfono",
                    name: "telefono",
                    index: "telefono",
                    align: 'right',
                    width: 100,

                    hidden: false
                },
                {
                    label: "Dirección",
                    name: "direccion",
                    index: "direccion",
                    align: 'left',
                    width: 200,

                    hidden: true
                },
                {
                    label: "Email",
                    name: "email",
                    index: "email",
                    align: 'left',
                    width: 200,
                    hidden: true
                },
                    ],
            jsonReader: {
                repeatitems: false,
                root: "lista",
                total: function (data) {
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
            loadError: function (xhr, st, err) {
                var response = MasterJqgridUtils.processResponseJqgrid(xhr, $scope.tableParams);
                if (xhr.status !== 404) {
                    $scope.alertErrorServices.addSimpleAlert("operationError", null, response.data.messages);
                    $scope.$apply();
                }
            },
            onSortCol: function (index, iCol, sortorder) {
                $scope.tableParams.setGridParam({
                    postData: {
                        orderBy: index,
                        orderDir: sortorder
                    }
                });
                $scope.disabled = true;
                $scope.$apply();
            },
            onSelectRow: function (id, status, e) {
                $scope.$apply($scope.rowSeleccionado = id);
                $scope.$apply($scope.disabled = false);
            },
            loadComplete: function (cellvalue) {},
            onPaging: function () {}
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
        $scope.launch = function (which) {
            var dlg = null;
            switch (which) {

            case 'eliminar':
                dlg = $dialogs.warningConfirm("Por Favor Confirmar", "Esta Seguro que desea eliminar el registro?");
                dlg.result.then(function (btn) {
                    $scope.eliminar();
                }, function (btn) {

                });
                break;

            }; // end switch
        };

        /**
         * Función que es invocada desde la vista para navegar a otra vista
         * @param path 
         * @function go()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#go
         */
        $scope.go = function (path) {
            $location.path($location.path() + path);
        };

        /**
         * Función que Modifica un dato seleccionado del jqgrid
         * @function modificar()
         * @public
         * @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#modificar
         */
        $scope.modificar = function () {
            // codigo seleccionado de ejemplo, aqui se le debe pasar el codigo de la fila seleccionada
            if ($scope.rowSeleccionado) {

                var fila = $scope.tableParams.getGridParam("userData")[$scope.rowSeleccionado - 1];

                $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);
                console.log(fila);
                // Navigator utilizado para pasar filtros entre controller
                Navigator.goTo($location.path() + '/modificar', {
                    dataM: fila
                });
            }
        };

        /**
         * Función que es invocada desde la vista para eliminar un recurso
         * @function eliminar ()
         * @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#eliminar
         * @public
         */
        $scope.eliminar = function () {
            $scope.uiBlockuiConfig.bloquear = true;
            if ($scope.rowSeleccionado) {
                $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);

                BaseServices.eliminar($scope.selectedRow.id, 'clientes/').then(
                    function (response) {
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
         * @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#limpiar
         * @public
         */
        $scope.limpiar = function () {

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
         * @name kml3-frontend.module.facturacion.js.controllers.areas-retencion-controller.js#buscar
         * @public
         */
        $scope.buscar = function () {
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
}]);