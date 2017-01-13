/**
* Modulo controlador para la crearción de recursos cabecera
* @table    cabecera
* @class
* @name     master-frontend.module.generadores.js.controllers.cabecera-controller.js
*
* @mail     <a href="mailto:elias.dominguezpires@gmail.com@ejemplo.com.py"/>
* @author   <a Elias Dominguez Pires</>
*/
       /**
        * Se define el controller y sus dependencias.
        */
        app.controller('CrearCabeceraController',
        [
           '$scope', '$route','serviciosjqgrid', '$location', '$dialogs', 'AlertServices','Navigator', '$filter', '$args', 'ModuloEjemploServices',
           function ($scope, $route ,serviciosjqgrid, $location, $dialogs, alertServices, Navigator, $filter, $args, ModuloEjemploServices) {
           
               /**
                *  Objeto  que almacena los filtros obtenidos del formulario
                *  @public
                *  @type {Object}
                *  @field
                *  @name master-frontend.module.generadores.js.controllers.crear-cabecera-controller.js#datos
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
                * Función que es llamada desde la vista al monento de confirmar
                * @function confirmar()
                * @public
                * @name master-frontend.module.generadores.js.controllers.crear-cabecera-controller.js#confirmar
                */
               $scope.confirmar = function () {
               
                   $scope.uiBlockuiConfig.bloquear = true;
                   CabeceraServices.insertar($scope.generarBodyData($scope.datos), 'cabecera')
                       .then(
                       function (response) {
                           try {
                               if (response.status === 201) {
               
                                   $scope.bloqueoFormulario = true;
               
                                   dlg = $dialogs.notify("Notificación", "Sus datos se guardaron con éxito!");
                                   dlg.result.then(function (btn) {
                                       $route.reload();
                                   }, function (btn) {
                                   });
               
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
                           $scope.uiBlockuiConfig.bloquear = false;
                       }
                   );
               };
               /**
                * Función que realiza la navegación al cancelar la operación
                * @function cancelar()
                * @public
                * @name master-frontend.module.generadores.js.controllers.crear-cabecera-controller.js#cancelar
                */
               $scope.cancelar = function () {
                   $location.path('/cabecera')
               };
           }
       ]);