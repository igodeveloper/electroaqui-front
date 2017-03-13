app.controller('ChequerasController', [
    '$scope', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', 'BaseServices',
    function ($scope, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, BaseServices) {

        $scope.titulo = 'Chequera';
        $scope.datos = {};

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
                estado: datos.estado

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
                estado: datos.estado
            }
            return bodyData;
        };

        $scope.alertSuccessConfig = {
            type: 'success',
            scroll: true,
            closeable: true,
            timeout: 10000
        };

        $scope.alertWarningConfig = {
            type: 'warning',
            scroll: true,
            closeable: true,
            timeout: 10000
        };

        $scope.alertErrorConfig = {
            type: 'danger',
            scroll: true,
            closeable: true,
            timeout: 10000
        };

        $scope.alertErrorServices = alertServices.getInstance();
        $scope.alertWarningServices = alertServices.getInstance();
        $scope.alertSuccesServices = alertServices.getInstance();

        $scope.uiBlockuiConfig = {
            'bloquear': false
        };

        var urlAccess = MasterUrl.serviceRest + 'chequera/';

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
            colModel: [{
                    label: "id",
                    name: "id",
                    index: "id",
                    align: "center",
                    width: 60,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Cliente",
                    name: "cliente",
                    index: "cliente",
                    align: "left",
                    width: 250,
                    classes: "wrappedCell",
                    hidden: false,
                    formatter: function (cellvalue, options, rowObject) {
                        var texto = 'No Disponible';
                        angular.forEach($scope.clientesLista, function (value, key) {
                            if (value.id == rowObject.idCliente)
                                texto = value.nombre + ' ' + value.apellido;

                        });
                        return texto;
                    }
                },
                {
                    label: "idFactura",
                    name: "idFactura",
                    index: "idFactura",
                    align: "center",
                    width: 200,
                    classes: "wrappedCell",
                    hidden: true
                },
                {
                    label: "Nro Cuota",
                    name: "cuota",
                    index: "cuota",
                    align: "center",
                    width: 80,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Estado",
                    name: "estado",
                    index: "estado",
                    align: "center",
                    width: 80,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Emisión",
                    name: "fechaEmision",
                    index: "fechaEmision",
                    formatter: function (cellValue, options) {
                        if (cellValue) {
                            return $filter('date')(new Date(cellValue), 'dd/MM/yyyy');
                        } else {
                            return '';
                        }
                    },
                    align: "center",
                    width: 120,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Vencimiento",
                    name: "fechaVencimiento",
                    index: "fechaVencimiento",
                    formatter: function (cellValue, options) {
                        if (cellValue) {
                            return $filter('date')(new Date(cellValue), 'dd/MM/yyyy');
                        } else {
                            return '';
                        }
                    },
                    align: "center",
                    width: 120,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Pago",
                    name: "fechaPago",
                    index: "fechaPago",
                    align: "center",
                    formatter: function (cellValue, options) {
                        if (cellValue) {
                            return $filter('date')(new Date(cellValue), 'dd/MM/yyyy');
                        } else {
                            return '';
                        }
                    },
                    width: 120,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Monto",
                    name: "monto",
                    index: "monto",
                    align: "right",
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                    width: 110,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Intereses",
                    name: "interes",
                    index: "interes",
                    align: "right",
                    width: 100,
                    classes: "wrappedCell",
                    hidden: true
                },
                {
                    label: "Intereses",
                    name: "montoInteres",
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                    index: "montoInteres",
                    align: "right",
                    width: 100,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "Total",
                    name: "montoTotal",
                    index: "montoTotal",
                    formatter: 'number',
                    formatoptions: {
                        thousandsSeparator: ".",
                        decimalPlaces: 0
                    },
                    align: "right",
                    width: 100,
                    classes: "wrappedCell",
                    hidden: false
                },
                {
                    label: "idCliente",
                    name: "idCliente",
                    index: "idCliente",
                    align: "center",
                    width: 200,
                    classes: "wrappedCell",
                    hidden: true
                }
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
            loadComplete: function (data) {
                if (data.lista) {
                    var row;
                    for (var i = 0; i < data.lista.length; i++) {
                        
                         if (data.lista[i].estado == 'PENDIENTE') {
                             row = $("#" + (i + 1));
                             row.addClass("infoTree");
                         }

                    }
                }
            },
            onPaging: function () {}
        };

        $scope.tableParams = new serviciosjqgrid(jqgridConfig);

        $scope.go = function (path) {
            $location.path($location.path() + path);
        };

        $scope.modificar = function () {
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

        $scope.eliminar = function () {
            $scope.uiBlockuiConfig.bloquear = true;
            if ($scope.rowSeleccionado) {
                $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);

                BaseServices.eliminar($scope.selectedRow.id, 'Chequera/').then(
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

        $scope.limpiar = function () {

            MasterUtils.deleteValues($scope.datos);

            $scope.tableParams.setGridParam({
                datatype: "local"
            });
            $scope.tableParams.reloadGrid();

        };

        $scope.buscar = function () {
            $scope.disabled = true;
            MasterUtils.deleteUndefinedValues($scope.datos);


            $scope.tableParams.setGridParam({
                postData: {
                    filtros: angular.toJson($scope.datos)
                }
            });
            $scope.tableParams.setGridParam({
                datatype: "json",
                page: "1"
            });
            $scope.tableParams.reloadGrid();
        };
        $scope.getListas = function (path, lista, obj) {
            var url = path + '/';

            BaseServices.getAll(url, obj, -1).then(
                function (response) {
                    if (response.status == 200) {
                        $scope[lista] = response.data;
                    } else {
                        $scope.alertErrorServices.addSimpleAlert("operationFailure", null,
                            "Ha ocurrido un error, inténtelo nuevamente mas tarde.");
                    }
                }
            );
        };
        $scope.getListas('clientes', 'clientesLista', {});
    }
]);