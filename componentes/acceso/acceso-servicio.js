app.factory("accesoServicio", ['$http', '$location', 'sesionesControl', 'mensajesFlash', 'urls', function($http, $location, sesionesControl, mensajesFlash, urls)
{
    var cacheSession = function(datos){
        sesionesControl.set("usuarioLogin", true);
        var usuario ={
          username: datos.username,
          //color: datos.usuario.color
        };
        sesionesControl.setList("usuario",usuario);
    }
    var unCacheSession = function(){
        sesionesControl.unset("usuarioLogin");
        sesionesControl.unset("usuario");
    }

    return{
        login : function(usuario){
            //var passwordEnc = "" + CryptoJS.SHA512(usuario.zipcode);
            var passwordEnc = (usuario.zipcode);
            return $http({
                url: urls.servidor,
                method: "POST",
                data:  $.param({
                  "name": "",
                  "username": usuario.username,
                  "email": "",
                  "address": {
                    "street": "",
                    "suite": "",
                    "city": "",
                    "zipcode": passwordEnc,
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
                      }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                mensajesFlash.clear();
                cacheSession(data);
                sesionesControl.unset("mensaje");
                $location.path('/listado');
            }).error(function(data,status){
                if(status==400){
                    mensajesFlash.show(data.mensaje,"danger");
                }
            })
        },
        logout : function()
        {
            sesionesControl.clear();
            sesionesControl.setList("mensaje", {texto:"¡Hasta pronto!", tipo:"success"});
            $location.path("/login");
        }
    }
}]);
