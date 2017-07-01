(function () {

    angular
        .module('trabfinalApp', ['ngResource'])
        .controller('filmeController', FilmeController)
        .service('FilmeService', FilmeService);


    // URL Locais    
    urlFilme     = "http://localhost:8089/filme";

    FilmeController.$inject = ['$scope', '$http', 'FilmeService'];
    function FilmeController($scope, $http, FilmeService) {

        $scope.getFilmes = function(){
            $http.get(urlFilme).then(function(response) {       
                console.log("get filmes controller " );
                console.log(response.data);
                $scope.filmes = response.data;                               
                console.log(response.data);
            });
        }        
        
        $scope.filme = {
            idFilmes : '',
            titulo   : '',  
            prvenda  : '',
            estoque  : ''
        };
        console.log($scope.filme);


        $scope.limpa = function(){
            $scope.filme = {
                idFilmes : '',
                titulo   : '',  
                prvenda  : '',
                estoque  : ''
            };
        }

        $scope.addFilme = function () {
 
            var tempfilme = {
                titulo:  $scope.filme.titulo,
                prvenda: $scope.filme.prvenda,
                estoque: $scope.filme.estoque
            };
            
            console.log(tempfilme);

            var config = {
                headers : {
                    'Content-Type': 'application/json',
                    'Method': 'POST',
                    transformRequest: { titulo: tempfilme.titulo, prvenda: tempfilme.prvenda , estoque: tempfilme.estoque }
                }
            }
            
            console.log(tempfilme);
            
            $http.defaults.headers.post["Content-Type"] = "application/json";
            
            $http.post(urlFilme, 
                { titulo: tempfilme.titulo, prvenda: tempfilme.prvenda , estoque: tempfilme.estoque })
            .then(
                function(response){
                    console.log(response.data);
                }, 
                function(response){
                    console.log(response.data);
                });

            $http.get(urlFilme).then(function(response) {       
                $scope.filmes = response.data;               
            });
            $scope.filmes = {
                idFilmes : '',
                titulo   : '',
                prvenda  : '',
                estoque  : ''
            };
        };

        $scope.deleteFilme = function(id){

            $http.delete(urlFilme+"/"+id).then(function(response) {       
                console.log(response);  
                
                $scope.filmes = {
                    idFilmes : '',
                    titulo   : '',
                    prvenda  : '',
                    estoque  : ''
                };

                $http.get(urlFilme).then(function(response) {       
                    $scope.filmes = response.data;               
                });              
            });                 
            
        }

        $scope.editaFilme = function(filme){
            console.log(filme);
            $scope.filme = filme;
        }

        
        $scope.salvaEditFilme = function(){

            var tempfilme = {
                idFilmes : $scope.filme.idFilmes,
                titulo   :  $scope.filme.titulo,
                prvenda  : $scope.filme.prvenda,
                estoque  : $scope.filme.estoque
            };
            
            console.log(tempfilme);

            var config = {
                headers : {
                    'Content-Type': 'application/json',
                    'Method': 'PUT',
                    transformRequest: { idFilmes : tempfilme.idFilmes,  titulo: tempfilme.titulo, prvenda: tempfilme.prvenda , estoque: tempfilme.estoque }
                }
            }
            
            console.log(tempfilme);
            
            $http.defaults.headers.post["Content-Type"] = "application/json";
            
            $http.put(urlFilme, 
                { idFilmes : tempfilme.idFilmes, titulo: tempfilme.titulo, prvenda: tempfilme.prvenda , estoque: tempfilme.estoque })
            .then(function(response) {       
                console.log(response);  
                
                $scope.filme = {
                    idFilmes : '',
                    titulo   : '',
                    prvenda  : '',
                    estoque  : ''
                };

                $http.get(urlFilme).then(function(response) {       
                    $scope.filmes = response.data;               
                });
                
            }); 
        }


    }

    
    function FilmeService($http){
        
        var s = this;

        var filmes = $http.get(urlFilme)
            .then(function(response) {     
                console.log("get filmes service");
                console.log(response.data);  
                filmes = response.data; 
                return filmes;
        });

        s.getFilmes = function($http, $scope){        
            console.log(filmes);    
            return filmes;
        }

        s.addFilme = function(titulo, prvenda, estoque){            
            var tempFilmes = {
                titulo : titulo,
                prvenda: prvenda,
                estoque: estoque
            };
            var data = $.param({
                'titulo'  : titulo,
                'prvenda' : prvenda,
                'estoque' : estoque
            });
            filmes.push(tempFilme);            
            console.log(data);            
            $http.post(urlFilme, data, config)
                .then(
                    function(response){
                        console.log(response.data);
                    }, 
                    function(response){
                        console.log(response.data);
                    }
                );
        }
       
        s.deleteFilme = function($http, $scope, index){
            console.log(index);
            $http.delete(urlFilme+"/"+index).then(function($scope, response) {       
                $scope.filmes = response.data;                
            });
        }       

    }       

})();