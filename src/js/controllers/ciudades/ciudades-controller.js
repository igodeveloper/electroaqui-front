/**
 * Modulo controlador para la administración de la página de ciudades
 * @table    personas
 * @class
 * @name     master-frontend.module.generadores.js.controllers.ciudades-controller.js
 *
 * @mail     <a href="mailto:elias.dominguezpires@gmail.com@ejemplo.com.py"/>
 * @author   <a Elias Dominguez Pires</>
 */
app.controller('CiudadesController', [
           '$scope', 'serviciosjqgrid', '$location', '$dialogs', 'AlertServices', 'Navigator', '$filter', '$args', 'CiudadesServices'
            , function ($scope, serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, $args, CiudadesServices) {
              /**
               *  Objeto  que almacena los filtros obtenidos del formulario
               *  @public
               *  @type {Object}
               *  @field
               *  @name master-frontend.module.generadores.js.controllers.generadores-controller.js#datos
               */
              $scope.datos = {};
              
              $scope.generarBodyData = function(datos){
            var bodyData = {
                codigoCiudad: datos.codigoCiudad,
                descripcion: datos.descripcion,
                codigoDepartamento: datos.codigoDepartamento,
                codigoAreaServicio: datos.codigoAreaServicio,
            }
            return bodyData;
        };
              
              $scope.generarParaJSON = function(datos){
            var bodyData = {
                codigoCiudad: datos.codigoCiudad,
                descripcion: datos.descripcion,
                codigoDepartamento: datos.codigoDepartamento,
                codigoAreaServicio: datos.codigoAreaServicio,
            }
            return bodyData;
        };
              
              
              /**
               *  Objeto de configuración del alert Info
               *  @type {Object}
               *  @field
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alertInfoConfig
               */
              $scope.alertInfoConfig = {
                  type: 'info',
                  scroll: true,
                  closeable: true,
                  timeout: 10000
              };
              /**
               *  Objeto que representa al servicio de administración del alert 
               *  @type {Object}
               *  @field
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alertInfoServices
               */
              $scope.alertInfoServices = alertServices.getInstance();
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
               *  Objeto que representa al servicio de administración del alert 
               *  @type {Object}
               *  @field
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alerServices
               */
              $scope.alertSuccesServices = alertServices.getInstance();
              
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
               *  Objeto que representa al servicio de administración del alert 
               *  @type {Object}
               *  @field
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alerServices
               */
              $scope.alertWarningServices = alertServices.getInstance();
              
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
               *  Objeto que representa al servicio de administración del alert 
               *  @type {Object}
               *  @field
               *  @name master-frontend.js.directives.directivas-bases.ui-alert-directives#alerServices
               */
              $scope.alertErrorServices = alertServices.getInstance();
               
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
                * @name master-frontend.module.generadores.js.controllers.generadores-controller.js#go
                */
               $scope.go = function (path) {
                   $location.path($location.path() + path);
               };
               
               /**
                * Función que Modifica un dato seleccionado del jqgrid
                * @function modificar()
                * @public
                * @name master-frontend.module.generadores.js.controllers.generadores-controller.js#modificar
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
                * @name master-frontend.module.generadores.js.controllers.generadores-controller.js#eliminar
                * @public
                */
               $scope.eliminar = function () {
                   $scope.uiBlockuiConfig.bloquear = true;
                   if ($scope.rowSeleccionado) {
                       $scope.selectedRow = $scope.tableParams.getRowData($scope.rowSeleccionado);
               
                       GeneradoresServices.eliminar($scope.generarParaJSON($scope.selectedRow), 'generadores').then(
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
                * @name master-frontend.module.generadores.js.controllers.generadores-controller.js#limpiar
                * @public
                */
               $scope.limpiar = function () {
               
                   MasterUtils.deleteValues($scope.datos);
               
                   $scope.tableParams.setGridParam({
                       datatype: "local"
                   });
                   $scope.tableParams.reloadGrid();
               
               };
            }
        ]);