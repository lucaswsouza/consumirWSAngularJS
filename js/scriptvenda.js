(function () {

    angular
        .module('trabfinalApp', ['ngResource'])
        .controller('vendaController', VendaController)
        .service('VendaService', VendaService);


    // URL Locais    
    urlVenda     = "http://localhost:8089/venda";

    VendaController.$inject = ['$scope', '$http', 'VendaService'];
    function VendaController($scope, $http, FilmeService) {

        $scope.getVendas = function(){
            $http.get(urlVenda).then(function(response) {       
                console.log("get venda controller " );
                console.log(response.data);
                $scope.vendas = response.data;                               
                console.log(response.data);
            });
        }        
        
        $scope.venda = {
            idVendas  : '',
            dataVenda : '',  
            idCliente : '',
            total     : '',
            idFilme   : ''
        };
        console.log($scope.venda);


        $scope.limpa = function(){
            $scope.venda = {
                idVendas  : '',
                dataVenda : '',  
                idCliente : '',
                total     : '',
                idFilme   : ''
            };
        }

        $scope.addVenda = function () {
 
            var tempvenda = {
                idVendas  : $scope.venda.idVendas,
                dataVenda : $scope.venda.dataVenda,
                idCliente : $scope.venda.idCliente,
                total     : $scope.venda.total,
                idFilme   : $scope.venda.idFilme
            };            
            
            console.log(tempvenda);

            var config = {
                headers : {
                    'Content-Type': 'application/json',
                    'Method': 'POST',
                    transformRequest: {  
                        idVendas  : tempvenda.idVendas,
                        dataVenda : tempvenda.dataVenda,
                        idCliente : tempvenda.idCliente,
                        total     : tempvenda.total,
                        idFilme   : tempvenda.idFilme
                    }
                }
            }
            
            console.log(tempvenda);
            
            $http.defaults.headers.post["Content-Type"] = "application/json";
            
            $http.post(urlVenda, 
                { idVendas  : tempvenda.idVendas,
                  dataVenda : tempvenda.dataVenda,
                  idCliente : tempvenda.idCliente,
                  total     : tempvenda.total,
                  idFilme   : tempvenda.idFilme
                })
            .then(
                function(response){
                    console.log(response.data);
                }, 
                function(response){
                    console.log(response.data);
                });

            $http.get(urlVenda).then(function(response) {       
                $scope.vendas = response.data;               
            });
            $scope.venda = {
                idVendas   : '',
                dataVenda : '',  
                idCliente : '',
                total     : '',
                idFilme   : ''
            };
        };


        $scope.deleteVenda = function(id){

            $http.delete(urlVenda+"/"+id).then(function(response) {       
                console.log(response);  
                $scope.venda = {
                    idVendas  : '',
                    dataVenda : '',  
                    idCliente : '',
                    total     : '',
                    idFilme   : ''
                };
                $http.get(urlVenda).then(function(response) {       
                    $scope.vendas = response.data;               
                });              
            });                 
            
        }


        $scope.editaVenda = function(venda){
            console.log(venda);
                
            // exclui venda da lista
            $http.delete(urlVenda + "/" + venda.idVendas).then(function(response) {       
                console.log(response);  
                
                //  $scope.venda = {
                //     idVendas  : '',
                //     dataVenda : '',  
                //     idCliente : '',
                //     total     : '',
                //     idFilme   : ''
                // };

                // atualiza lista
                $http.get(urlVenda).then(function(response) {       
                    $scope.vendas = response.data;               
                });              
            });      

            $scope.venda = venda;
        }


    }

    
    function VendaService($http){
        
        var s = this;

        var vendas = $http.get(urlVenda)
            .then(function(response) {     
                console.log("get venda service");
                console.log(response.data);  
                filmes = response.data; 
                return filmes;
        });

        s.getVendas = function($http, $scope){        
            console.log(vendas);    
            return vendas;
        }

        s.addVenda = function(  idVendas , dataVenda , idCliente , total , idFilme){            
            var tempVendas = {
                idVendas  : idVendas, 
                dataVenda : dataVenda, 
                idCliente : idCliente, 
                total     : total, 
                idFilme   : idFilme
            };
            var data = $.param({
                'idVendas'  : idVendas, 
                'dataVenda' : dataVenda, 
                'idCliente' : idCliente, 
                'total'     : total,
                'idFilme'   : idFilme
            });
            vendas.push(tempVenda);            
            console.log(data);            
            $http.post(urlVenda, data, config)
                .then(
                    function(response){
                        console.log(response.data);
                    }, 
                    function(response){
                        console.log(response.data);
                    }
                );
        }
       
        s.deleteVenda = function($http, $scope, index){
            console.log(index);
            $http.delete(urlVenda+"/"+index).then(function($scope, response) {       
                $scope.vendas = response.data;                
            });
        }       

    }       

})();