(function () {
    angular.module('appTrabalho', ['ngResource'])
        .controller('FilmeController', FilmeController)
        .service('FilmeService', FilmeService);

    //injeção de escopo
    FilmeController.$inject = ['$scope', '$http', 'FilmeService'];
    
    //o scope está sendo usado pra monstrar onde a variavel vai aparecer, dependendo de onde voce colocar o controller
    function FilmeController($scope, $http, FilmeService) {
        
        $scope.getFilmes = function(){
            $http.get("localhost:8080/webService").then(function(response) {       
                $scope.filmes = response.data.data;
                               
            });
        }
        
        //console.log($scope.filmes);
        $scope.filmes = {
            idFilmes: '',
            titulo: '',
            prvenda: '',
            estoque: ''
        };
        $scope.addFilme = function () {
 
            var tempFilme = {
                titulo: $scope.filme.titulo,
                prvenda: $scope.filme.prvenda,
                estoque: $scope.filme.estoque
            };
            
            
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Method': 'POST',
                    transformRequest: $.param(tempFilme)
                }
            }
            //console.log(data);
            console.log(tempFilme);
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            
            //esse funciona , aparentemente o config dá pau
            $http.post('localhost:8080/webService',$.param(tempFilme))
            .then(
                function(response){
                    // success callback
                    console.log(response.data);
                }, 
                function(response){
                    // failure callback
                    console.log(response.data);
                });
            $http.get("localhost:8080/webService").then(function(response) {       
                $scope.filmes = response.data.data;                
            });
            $scope.filme = {
                idFilmes: '',
                titulo: '',
                prvenda: '',
                estoque: ''
            };
        };

    }

    function FilmeService($http){
        //boa prática para legibilidade
        var service = this;

        var filmes = $http.get("localhost:8080/webService")
            .then(function(response) {       
                filmes = JSON.parse(JSON.stringify(response.data.data));
                return filmes;
        });
        
        service.addFilme = function(titulo, prvenda, estoque){
            
             var tempFilme = {
                titulo: titulo,
                prvenda: prvenda,
                estoque: estoque
            };
            var data = $.param({
                'titulo' : titulo,
                'prvenda' : prvenda,
                'estoque' : estoque
            });
            filmes.push(tempFilme);
            var config = {
                headers : {
                    //'Content-Type': 'application/json;charset=utf-8;'
                }
            }
            console.log(data);
            //console.log();
            $http.post('/api/filmes', data, config)
            .then(
                function(response){
                    // success callback
                    console.log(response.data);
                }, 
                function(response){
                    // failure callback
                    console.log(response.data);
                }
                );
            
        }

        service.getFilmes = function($http, $scope){
            
            return filmes;

        }
       

    }
})();