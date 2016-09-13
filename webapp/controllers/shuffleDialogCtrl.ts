module webapp.controllers {
    export class ShuffleDialogCtrl {
        static $inject = [
            "$scope",
            "$mdDialog",
            "CardService"
        ]
        constructor(
            private $scope,
            private $mdDialog,
            private CardService
        ){
            $scope.shuffleTechnique;
            $scope.shuffleTypes = [];

            CardService.getShuffleTypes()
            .then(function(data){
                $scope.shuffleTypes = data;
            });
            
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.shuffle = function() {
                $mdDialog.hide($scope.shuffleTechnique);
            };
        }
    }
}