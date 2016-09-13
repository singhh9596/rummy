/// <reference path="./typings/main.d.ts" />
/// <reference path="./controllers/shuffleDialogCtrl.ts" />
/// <reference path="./directives/BaseAppDirective.ts" />
/// <reference path="./directives/DeckDirective.ts" />
/// <reference path="./services/card.ts" />

module webapp{
    export function boot(){
        var app: ng.IModule = angular.module("rummy",[
            'ngMaterial',
            'ngRoute',
            'ngPlayingCards'
        ]);
        registerConfig(app);
        registerDirectives(app);
        registerServices(app);
    }
    
    function registerConfig(app: ng.IModule){
        app.config(['$routeProvider',
            function config( $routeProvider) {
            
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

    function registerDirectives(app){
        app.directive("baseApp", webapp.directives.BaseAppDirective);
        app.directive("deck", webapp.directives.DeckDirective);
    }

    function registerServices(app: ng.IModule){
        app.service("CardService", webapp.services.CardService);
    }

    function registerControllers(app: ng.IModule){
        app.controller("ShuffleDialogCtrl",webapp.controllers.ShuffleDialogCtrl);
    }
}
webapp.boot();