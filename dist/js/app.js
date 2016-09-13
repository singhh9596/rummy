var webapp;
(function (webapp) {
    var controllers;
    (function (controllers) {
        var ShuffleDialogCtrl = (function () {
            function ShuffleDialogCtrl($scope, $mdDialog, CardService) {
                this.$scope = $scope;
                this.$mdDialog = $mdDialog;
                this.CardService = CardService;
                $scope.shuffleTechnique;
                $scope.shuffleTypes = [];
                CardService.getShuffleTypes()
                    .then(function (data) {
                    $scope.shuffleTypes = data;
                });
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.shuffle = function () {
                    $mdDialog.hide($scope.shuffleTechnique);
                };
            }
            ShuffleDialogCtrl.$inject = [
                "$scope",
                "$mdDialog",
                "CardService"
            ];
            return ShuffleDialogCtrl;
        })();
        controllers.ShuffleDialogCtrl = ShuffleDialogCtrl;
    })(controllers = webapp.controllers || (webapp.controllers = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var directives;
    (function (directives) {
        var BaseAppDirective = (function () {
            function BaseAppDirective() {
                return {
                    templateUrl: '/partials/baseapp.html',
                    controller: BaseAppDirectiveController,
                };
            }
            return BaseAppDirective;
        })();
        directives.BaseAppDirective = BaseAppDirective;
        var BaseAppDirectiveController = (function () {
            function BaseAppDirectiveController($scope, $location, CardService) {
                this.$scope = $scope;
                this.$location = $location;
                this.CardService = CardService;
                $scope.numberOfSets = 1;
                $scope.getCards = function () {
                    var options = {
                        numberOfSets: $scope.numberOfSets
                    };
                    CardService.fetchCards(options)
                        .then(function (data) {
                        CardService.setDeck(data);
                        $location.path("/deck");
                    });
                };
            }
            BaseAppDirectiveController.$inject = [
                "$scope",
                "$location",
                "CardService"
            ];
            return BaseAppDirectiveController;
        })();
    })(directives = webapp.directives || (webapp.directives = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var directives;
    (function (directives) {
        var DeckDirective = (function () {
            function DeckDirective() {
                return {
                    templateUrl: "/partials/deck.html",
                    controller: DeckDirectiveController
                };
            }
            return DeckDirective;
        })();
        directives.DeckDirective = DeckDirective;
        var DeckDirectiveController = (function () {
            function DeckDirectiveController($scope, $location, $mdDialog, CardService) {
                this.$scope = $scope;
                this.$location = $location;
                this.$mdDialog = $mdDialog;
                this.CardService = CardService;
                var deck = CardService.getDeck();
                if (deck.length > 0) {
                    $scope.deck = deck;
                }
                else {
                    $location.path("/");
                }
                $scope.shuffleDialog = function (ev) {
                    $mdDialog.show({
                        controller: webapp.controllers.ShuffleDialogCtrl,
                        templateUrl: '/partials/shuffleDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                        .then(function (shuffleType) {
                        var options = {
                            deck: angular.toJson($scope.deck),
                            shuffleType: shuffleType
                        };
                        CardService.shuffle(options)
                            .then(function (data) {
                            $scope.deck = data;
                        });
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
                };
            }
            DeckDirectiveController.$inject = [
                "$scope",
                "$location",
                "$mdDialog",
                "CardService"
            ];
            return DeckDirectiveController;
        })();
    })(directives = webapp.directives || (webapp.directives = {}));
})(webapp || (webapp = {}));
var webapp;
(function (webapp) {
    var services;
    (function (services) {
        var CardService = (function () {
            function CardService($http, deck) {
                this.$http = $http;
                this.deck = deck;
                this.deck = [];
            }
            /**
             * fetchCards
             */
            CardService.prototype.fetchCards = function (options) {
                return this.$http.get("/cards", { params: options })
                    .then(function (response) {
                    return response.data;
                });
            };
            CardService.prototype.getShuffleTypes = function () {
                return this.$http.get("shuffleTypes")
                    .then(function (response) {
                    return response.data;
                });
            };
            CardService.prototype.shuffle = function (options) {
                return this.$http.get("/shuffledCards", { params: options })
                    .then(function (response) {
                    return response.data;
                });
            };
            CardService.prototype.setDeck = function (deck) {
                this.deck = deck;
            };
            CardService.prototype.getDeck = function () {
                return this.deck;
            };
            CardService.$inject = [
                '$http'
            ];
            return CardService;
        })();
        services.CardService = CardService;
    })(services = webapp.services || (webapp.services = {}));
})(webapp || (webapp = {}));
/// <reference path="./typings/main.d.ts" />
/// <reference path="./controllers/shuffleDialogCtrl.ts" />
/// <reference path="./directives/BaseAppDirective.ts" />
/// <reference path="./directives/DeckDirective.ts" />
/// <reference path="./services/card.ts" />
var webapp;
(function (webapp) {
    function boot() {
        var app = angular.module("rummy", [
            'ngMaterial',
            'ngRoute',
            'ngPlayingCards'
        ]);
        registerConfig(app);
        registerDirectives(app);
        registerServices(app);
    }
    webapp.boot = boot;
    function registerConfig(app) {
        app.config(['$routeProvider',
            function config($routeProvider) {
                $routeProvider.
                    when('/', {
                    template: '<base-app></base-app>'
                }).
                    when('/deck', {
                    template: '<deck></deck>'
                }).
                    otherwise('/');
            }
        ]);
    }
    function registerDirectives(app) {
        app.directive("baseApp", webapp.directives.BaseAppDirective);
        app.directive("deck", webapp.directives.DeckDirective);
    }
    function registerServices(app) {
        app.service("CardService", webapp.services.CardService);
    }
    function registerControllers(app) {
        app.controller("ShuffleDialogCtrl", webapp.controllers.ShuffleDialogCtrl);
    }
})(webapp || (webapp = {}));
webapp.boot();
