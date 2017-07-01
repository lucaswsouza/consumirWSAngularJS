(function () {

    angular
        .module('trabfinalApp', ['ngResource'])
        .controller('clienteController', ClienteController)
        .service('ClienteService', ClienteService);


    // URL Locais    
    urlCliente   = "http://localhost:8089/cliente";

    ClienteController.$inject = ['$scope', '$http', 'ClienteService'];
    function ClienteController($scope, $http, FilmeService) {

        $scope.getClientes = function(){
            $http.get(urlCliente).then(function(response) {       
                console.log("get clientes controller " );
                console.log(response.data);
                $scope.clientes = response.data;                               
                console.log(response.data);
            });
        }        
        
        $scope.cliente = {
            idCliente : '',
            nome      : ''
        };
        console.log($scope.cliente);


        $scope.limpaCliente = function(){
            $scope.cliente = {
                idCliente : '',
                nome   : ''
            };
        }

        $scope.addCliente = function () {
 
            var tempcliente = {
                nome:  $scope.cliente.Nome
            };
            
            console.log(tempcliente);

            var config = {
                headers : {
                    'Content-Type': 'application/json',
                    'Method': 'POST',
                    transformRequest: { nome: tempcliente.nome }
                }
            }
            
            console.log(tempcliente);
            
            $http.defaults.headers.post["Content-Type"] = "application/json";
            
            $http.post(urlCliente, 
                { nome: tempcliente.nome })
            .then(
                function(response){
                    console.log(response.data);
                }, 
                function(response){
                    console.log(response.data);
                });

            $http.get(urlCliente).then(function(response) {       
                $scope.cliente = response.data;               
            });
            $scope.clientes = {
                idCliente : '',
                Nome      : ''
            };
        };

        $scope.deleteCliente = function(id){

            $http.delete(urlCliente+"/"+id).then(function(response) {       
                console.log(response);  
                
                $scope.clientes = {
                    idCliente : '',
                    nome      : ''
                };

                $http.get(urlCliente).then(function(response) {       
                    $scope.clientes = response.data;               
                });              
            });                 
            
        }

        $scope.editaCliente = function(cliente){
            console.log(cliente);
                
            
            $http.delete(urlCliente+"/"+cliente.idCliente).then(function(response) {       
                console.log(response);  
                
                $scope.clientes = {
                    idCliente : '',
                    nome   : ''
                };

                // atualiza lista
                $http.get(urlCliente).then(function(response) {       
                    $scope.clientes = response.data;               
                });              
            });      

            $scope.cliente = cliente;
        }


    }

    
    function ClienteService($http){
        
        var s = this;

        var clientes = $http.get(urlCliente)
            .then(function(response) {     
                console.log("get cliente service");
                console.log(response.data);  
                clientes = response.data; 
                return clientes;
        });

        s.getClientes = function($http, $scope){        
            console.log(clientes);    
            return clientes;
        }

        s.addCliente = function(nome){            
            var tempClientes = {
                nome : nome
            };
            var data = $.param({
                'nome'  : nome
            });
            filmes.push(tempClientes);            
            console.log(data);            
            $http.post(urlCliente, data, config)
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
            $http.delete(urlCliente+"/"+index).then(function($scope, response) {       
                $scope.clientes = response.data;                
            });
        }       

    }       

})();