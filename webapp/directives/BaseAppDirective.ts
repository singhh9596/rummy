module webapp.directives {
    export class BaseAppDirective {
        constructor(){
            return {
                templateUrl: '/partials/baseapp.html',
                controller: BaseAppDirectiveController,
            };
        }
    }

    class BaseAppDirectiveController{
            
       static $inject = [
           "$scope",
           "$location",
           "CardService"
       ];

       constructor(
           private $scope,
           private $location,
           private CardService
       ){
           $scope.numberOfSets = 1;

           $scope.getCards = function(){
               var options = {
                   numberOfSets: $scope.numberOfSets
               }
               CardService.fetchCards(options)
               .then(function(data){
                   CardService.setDeck(data);
                   $location.path("/deck")
               })
           }
       }
    }
}