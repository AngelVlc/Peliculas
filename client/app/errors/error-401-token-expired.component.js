System.register(["@angular/core", "../_services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, authentication_service_1, Error401TokenExpiredComponent;
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
            Error401TokenExpiredComponent = (function () {
                function Error401TokenExpiredComponent(authenticationService) {
                    this.authenticationService = authenticationService;
                }
                Error401TokenExpiredComponent.prototype.ngOnInit = function () {
                    // reset login status
                    this.authenticationService.logout();
                };
                return Error401TokenExpiredComponent;
            }());
            Error401TokenExpiredComponent = __decorate([
                core_1.Component({
                    template: "\n        <div class=\"container\">\n            <h3>El token ha caducado.</h3>\n\n            <div class=\"panel-body\">\n                <a [routerLink]=\"['/login']\">Iniciar sesi\u00F3n</a>\n            </div>\n        </div>\n  "
                }),
                __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
            ], Error401TokenExpiredComponent);
            exports_1("Error401TokenExpiredComponent", Error401TokenExpiredComponent);
        }
    };
});
//# sourceMappingURL=error-401-token-expired.component.js.map