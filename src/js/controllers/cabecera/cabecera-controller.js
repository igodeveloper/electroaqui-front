/**
* Modulo controlador para la administración de la página de cabecera
* @table    cabecera
* @class
* @name     master-frontend.module.generadores.js.controllers.cabecera-controller.js
*
* @mail     <a href="mailto:elias.dominguezpires@gmail.com@ejemplo.com.py"/>
* @author   <a Elias Dominguez Pires</>
*/
       app.controller('CabeceraController',
       [
         '$scope', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', '$args', 'ModuloEjemploServices',
          function ($scope, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, $args, ModuloEjemploServices) {
          
              /**
               *  Objeto  que almacena los filtros obtenidos del formulario
               *  @public
               *  @type {Object}
               *  @field
               *  @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#datos
               */
              $scope.datos = {};
              
              $scope.generarBodyData = function(datos){
				    var bodyData = {
				        codigo: datos.codigo,
				        descripcion: datos.descripcion,
				    }
				    return bodyData;
				};
              
              $scope.generarParaJSON = function(datos){
				    var bodyData = {
				        codigo: datos.codigo,
				        descripcion: datos.descripcion,
				    }
				    return bodyData;
				};
              
              /**
               *  Objeto de configuración del alert Success
               *  @type {Object}
               *  @field
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alertSuccessConfig
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
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alertWarningConfig
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
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alertErrorConfig
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
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alerServices
               */
              $scope.alertErrorServices = alertServices.getInstance();
              $scope.alertWarningServices = alertServices.getInstance();
              $scope.alertSuccesServices = alertServices.getInstance();
              /**
               * Objeto de configuración de la directiva ui-blockui
               * @type {Object}
               * @name master-frontend.js.directives.directivas-bases.ui-blockui-directives#uiBlockuiConfig
               */
              $scope.uiBlockuiConfig = {
                  'bloquear': false
              };
              
              /**
               * url para de los servicios RESTful
               * @type {String}
               * @public
               */
              var urlAccess = MasterUrl.serviceRestPostgres + 'cabecera';
              
              /**
               *  Objeto de configuración de la directiva jqgrid
               *  @type {Object}                 
               *  @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#jqgridConfig
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
                      orderBy: "",
                      //orderDir: "asc",
                      //filtros: ""
                  },
                  colModel: [
                      {label: "codigo", name: "codigo", index: "codigo", align: "center", width: 200, classes:"wrappedCell", hidden:false},
                        {label: "descripcion", name: "descripcion", index: "descripcion", align: "center", width: 200, classes:"wrappedCell", hidden:false},
                        
                  ],
                  jsonReader: {
                      repeatitems: false,
                      root: "lista",
                      total: function (data) {
                          var total = Math.ceil(data.totalDatos /
                              $scope.tableParams.getGridParam("rowNum"));
                          return total;
                      },
                      records: "totalDatos",
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
                      var response = Kml3JqgridUtils.processResponseJqgrid(xhr, $scope.tableParams);
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
                      $scope.buscarDetalle0();
                  },
                  loadComplete: function () {
                      $scope.disabled = true;                      
                  },
                  onPaging:function(){
                      $scope.disabled = true;
                      $scope.$apply();
                  }
              };
              
              /** 
                * Instancia del servicio que administra la tabla jqgrid
                * @type config
                * @public
                */
               $scope.tableParams = new serviciosjqgrid(jqgridConfig);
               
               $scope.disabledDetalle0 = true;
               /**
                * url para de los servicios RESTful
                * @type {String}
                * @public
                */
               var urlAccessDetalle0 = MasterUrl.serviceRestPostgres + 'detalle1';
               
               /**
                *  Objeto de configuración de la directiva jqgrid
                *  @type {Object}                 
                *  @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#jqgridConfig
                *  @public
                */
               var jqgridConfigDetalle0 = {
                   url: urlAccessDetalle0,
                   datatype: "local",
                   height: "auto",
                   shrinkToFit: true,
                   autowidth: true,
                   rowNum: 10,
                   rowList: [],
                   postData: {
                       cantidad: function () {
                           return $scope.tableParamsDetalle0.getGridParam("rowNum");
                       },
                       inicio: function () {
                           return $scope.tableParamsDetalle0.getRowsStart();
                       },
                       orderBy: "",
                       //orderDir: "asc",
                       //filtros: ""
                   },
                   colModel: [
                       {label: "cabe_codigo", name: "cabeCodigo", index: "cabeCodigo", align: "center", width: 200, classes:"wrappedCell", hidden:false},
                        {label: "det1_descripcion", name: "det1Descripcion", index: "det1Descripcion", align: "center", width: 200, classes:"wrappedCell", hidden:false},
                        {label: "det1_codigo", name: "det1Codigo", index: "det1Codigo", align: "center", width: 200, classes:"wrappedCell", hidden:false},

                   ],
                   jsonReader: {
                       repeatitems: false,
                       root: "lista",
                       total: function (data) {
                           var total = Math.ceil(data.totalDatos /
                               $scope.tableParamsDetalle0.getGridParam("rowNum"));
                           return total;
                       },
                       records: "totalDatos",
                       id: "Id",
                       userdata: "lista"
                   },
                   emptyrecords: "Sin Datos",
                   pager: "#pagerDetalle0",
                   viewrecords: true,
                   gridview: false,
                   hidegrid: false,
                   altRows: true,
                   loadError: function (xhr, st, err) {
                       var response = Kml3JqgridUtils.processResponseJqgrid(xhr, $scope.tableParamsDetalle0);
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
                       $scope.$apply($scope.rowSeleccionadoDetalle0 = id);
                       $scope.$apply($scope.disabledDetalle0 = false);
                   },
                   loadComplete: function () {
                       $scope.disabledDetalle0 = true;
                   },
                   onPaging:function(){
                       $scope.disabledDetalle0 = true;
                       $scope.$apply();
                   }
               };
               
               /** 
                * Instancia del servicio que administra la tabla jqgrid
                * @type config
                * @public
                */
               $scope.tableParamsDetalle0 = new serviciosjqgrid(jqgridConfigDetalle0);
               
               /*
                * Función que crea un dato recurso nuevo
                * @function agregarDetalleDetalle0()
                * @public
                */
               $scope.agregarDetalle0 = function () {
                   if ($scope.rowSeleccionado) {
               
                       var fila = $scope.tableParams.getGridParam("userData")[$scope.rowSeleccionado - 1];
                        $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);
                       // Navigator utilizado para pasar filtros entre controller
                       Navigator.goTo($location.path() + '/agregar-detalle-0', {
                           dataM: fila
                       });
                   }
               };
               
               /*
                * Función que crea un dato recurso nuevo
                * @function modificarDetalleDetalle0()
                * @public
                */
               $scope.modificarDetalle0 = function () {
                   if ($scope.rowSeleccionadoDetalle0) {
                        $scope.selectedRowDetalle0 = $scope.tableParamsDetalle0.getRowData($scope.rowSeleccionadoDetalle0);
                       // Navigator utilizado para pasar filtros entre controller
                       Navigator.goTo($location.path() + '/agregar-detalle-0', {
                           dataM: $scope.selectedRowDetalle0
                       });
                   }
               };
               
               /**
                * Funcion del controller, que se encarga de listar registros en base a un filtro
                * @param $scope.datos
                * @function buscar()
                * @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#buscar
                * @public
                */
               $scope.buscarDetalle0 = function () {
                   if ($scope.rowSeleccionado) {
                       $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);
                       $scope.datosDetalle0 = {
                           cabeCodigo: $scope.selectedRow.codigo
                       }
                       MasterUtils.deleteUndefinedValues($scope.datosDetalle0);
               
                       $scope.tableParamsDetalle0.setGridParam({
                          postData: {
                             filtros: angular.toJson($scope.datosDetalle0)
                         }
                       });
                       $scope.tableParamsDetalle0.setGridParam({
                          datatype: "json",
                          page: "1"
                       });
                       $scope.tableParamsDetalle0.reloadGrid();
                   }
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
                   
                       case 'eliminar':
                           dlg = $dialogs.warningConfirm("Por Favor Confirmar", "Esta Seguro que desea eliminar el registro?");
                           dlg.result.then(function (btn) {
                               $scope.eliminar();
                           },function (btn) {
               
                           });
                       break;
               
                   }; // end switch
               };
               
               /**
                * Función que es invocada desde la vista para navegar a otra vista
                * @param path 
                * @function go()
                * @public
                * @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#go
                */
               $scope.go = function (path) {
                   $location.path($location.path() + path);
               };
               
               /**
                * Función que Modifica un dato seleccionado del jqgrid
                * @function modificar()
                * @public
                * @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#modificar
                */
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
               
               /**
                * Función que es invocada desde la vista para eliminar un recurso
                * @function eliminar ()
                * @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#eliminar
                * @public
                */
               $scope.eliminar = function () {
                   $scope.uiBlockuiConfig.bloquear = true;
                   if ($scope.rowSeleccionado) {
                       $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);
               
                       CabeceraServices.eliminar($scope.generarParaJSON($scope.selectedRow), 'cabecera').then(
                           function (response) {
                               try {
                                   if (response.status === 200) {
                                       $scope.alertSuccesServices.addSimpleAlert("success", null,"Los datos se eliminaron correctamente");
               
                                       MasterUtils.deleteUndefinedValues($scope.datos);
                                       $scope.tableParams.setGridParam({postData: {filtros: null}});
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
                               }
                               catch(err) {
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
                * @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#limpiar
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
                * @name master-frontend.module.generadores.js.controllers.cabecera-controller.js#buscar
                * @public
                */
               $scope.buscar = function () {
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
           }
       ]
   );