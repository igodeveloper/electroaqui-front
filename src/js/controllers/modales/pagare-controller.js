app.controller('PagareController', ['$scope', 'serviciosjqgrid', '$modalInstance', 'BaseServices', 'data',
    function($scope, serviciosjqgrid, $modalInstance, BaseServices, data) {

        /*
         * Objeto cliente
         * @type Object
         * @field
         *
         * @name kml3.module.js.controllers.ventanas-emergentes.BusquedaEjemploController#cliente
         */
        console.log(data);
        var month = new Array(11);
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Setiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Diciembre";
        $scope.datos = data;

        var fecha = new Date();
        $scope.datos.dia = fecha.getDate();
        $scope.datos.mes = month[fecha.getMonth()];
        $scope.datos.anho = fecha.getFullYear();



        /*Función al cual se invoca cuando se presiona el botón Cancelar en el popUp
         * @function
         * @public
         *
         * @name kml3.module.js.controllers.ventanas-emergentes.BusquedaEjemploController#cancel
         */
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
            var table = document.getElementById('pagare').innerHTML;
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
])