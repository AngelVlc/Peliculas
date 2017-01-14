System.register(["@angular/core", "./_services/authentication.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, authentication_service_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(authService) {
                    this.authService = authService;
                }
                AppComponent.prototype.isUserLoged = function () {
                    return this.authService.isUserLoged();
                };
                AppComponent.prototype.isUserLogedAdmin = function () {
                    return this.authService.isUserLogedAdmin();
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'my-app',
                    template: "\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n            <div class=\"col-sm-8 col-sm-offset-2\">       \n                <nav *ngIf=\"this.authService.isUserLoged()\">\n                  <a [routerLink]=\"['/']\" routerLinkActive=\"active\">Inicio</a>\n                  <a *ngIf=\"this.authService.isUserLogedAdmin()\" [routerLink]=\"['/usersList']\" routerLinkActive=\"active\">Usuarios</a>\n                  <a [routerLink]=\"['/login']\">Cerrar sesi\u00F3n</a>\n                </nav>     \n                <router-outlet></router-outlet>\n            </div>\n        </div>\n    </div>\n  "
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.component.js.map