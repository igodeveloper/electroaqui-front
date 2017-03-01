app.controller('ChequeraController', ['$scope', 'serviciosjqgrid', '$modalInstance', 'BaseServices', 'data',
    function($scope, serviciosjqgrid, $modalInstance, BaseServices, data) {

        $scope.datos = data;

        $scope.cancel = function() {
            $modalInstance.dismiss('canceled');
        }; // end cancel

        /*Función al cual se invoca cuando se presiona el botón Aceptar en el popUp
         * @function
         * @public
         *
         * @name kml3.module.js.controllers.ventanas-emergentes.BusquedaEjemploController#save
         */
        $scope.imprimir = function() {
            var table = document.getElementById('chequera').innerHTML;
            var myWindow = window.open('', '', 'width=800, height=600');

            myWindow.document.write(table);
            myWindow.print();
            $modalInstance.dismiss('canceled');
        }; // end save

        /*Función al cual se invoca cuando ocurre un keyup en el popUp
         * @function
         * @public
         *
         *@name kml3.module.js.controllers.ventanas-emergentes.BusquedaEjemploController#hitEnter
         */
        $scope.hitEnter = function(evt) {
            $scope.imprimir();
        }; //end hitEnter
    }
]);