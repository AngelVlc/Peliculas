System.register(["@angular/core", "@angular/router", "../_services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1, AuthUserGuard;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            AuthUserGuard = (function () {
                function AuthUserGuard(router, authService) {
                    this.router = router;
                    this.authService = authService;
                }
                AuthUserGuard.prototype.canActivate = function () {
                    if (this.authService.isUserLoged()) {
                        // logged in so return true
                        return true;
                    }
                    // not logged in so redirect to login page
                    this.router.navigate(['/login']);
                    return false;
                };
                return AuthUserGuard;
            }());
            AuthUserGuard = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthenticationService])
            ], AuthUserGuard);
            exports_1("AuthUserGuard", AuthUserGuard);
        }
    };
});
//# sourceMappingURL=auth.user-guard.js.map