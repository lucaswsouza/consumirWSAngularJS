(function () {

    angular
        .module('trabfinalApp', ['ngResource'])
        .controller('relatorioController', RelatorioController)
        .service('RelatorioService', RelatorioService);


    // URL Locais    
    urlRelatorio     = "http://localhost:8089/relatorio";

    RelatorioController.$inject = ['$scope', '$http', 'RelatorioService'];
    function RelatorioController($scope, $http, RelatorioService) {

        $scope.getRelatorio = function(){
            $http.get(urlRelatorio).then(function(response) {       
                console.log("get relatorio " );
                console.log(response.data);
                $scope.relatorios = response.data;                               
                console.log(response.data);
            });
        }        
        
        $scope.relatorio = {
            id     : '',
            total  : '',
            titulo : ''
        };
        console.log($scope.relatorios);


    }

    
    function RelatorioService($http){
        
        var s = this;

        var relatorios = $http.get(urlRelatorio)
            .then(function(response) {     
                console.log("get relatorio");
                console.log(response.data);  
                filmes = response.data; 
                return relatorios;
        });

        s.getRelatorio = function($http, $scope){        
            console.log(relatorios);    
            return relatorios;
        }

    }       

})();