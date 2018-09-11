// controlador de acceso
app.controller("accesoControlador", ['$scope', 'accesoServicio', function($scope, accesoServicio){
    $scope.usuario = {
      "name": "",
      "username": "",
      "email": "",
      "address": {
        "street": "",
        "suite": "",
        "city": "",
        "zipcode": "",
        "geo": {
          "lat": "",
          "lng": ""
              }
            },
      "phone": "",
      "website": "",
      "company": {
        "name": "",
        "catchPhrase": "",
        "bs": ""
          }
          };
    accesoServicio.mensaje = "";
    $scope.login = function(){
      $scope.loading = true;
      var promise = accesoServicio.login($scope.usuario);
      promise.then(function(data) {
        $scope.loading = false;
      }, function(error) {
         $scope.usuario.zipcode = "";
         $scope.loading = false;
      });
    }

    $scope.logout = function(){
      accesoServicio.logout();
    };
}]);
