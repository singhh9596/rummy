module webapp.directives {
    export class DeckDirective {
        constructor(){
            return {
                templateUrl: "/partials/deck.html",
                controller: DeckDirectiveController
            }
        }
    }
    
    class DeckDirectiveController {
        static $inject = [
            "$scope",
            "$location",
            "$mdDialog",
            "CardService"
        ];

        constructor(
            private $scope,
            private $location,
            private $mdDialog,
            private CardService
        ){
            var deck = CardService.getDeck();

            if (deck.length > 0) {
                $scope.deck = deck;
            } else {
                $location.path("/");
            }

            $scope.shuffleDialog = function (ev) {
                $mdDialog.show({
                    controller: webapp.controllers.ShuffleDialogCtrl,
                    templateUrl: '/partials/shuffleDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(shuffleType) {
                    var options = {
                        deck: angular.toJson($scope.deck),
                        shuffleType: shuffleType
                    }
                    CardService.shuffle(options)
                    .then(function(data){
                        $scope.deck = data;
                    });
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            }
        }
    }
}