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
    var core_1, router_1, authentication_service_1, LoginFormComponent;
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
            LoginFormComponent = (function () {
                function LoginFormComponent(router, authenticationService) {
                    this.router = router;
                    this.authenticationService = authenticationService;
                    this.model = {};
                    this.loading = false;
                    this.error = '';
                }
                LoginFormComponent.prototype.ngOnInit = function () {
                    // reset login status
                    this.authenticationService.logout();
                };
                LoginFormComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.loading = true;
                    this.authenticationService.login(this.model.name, this.model.password)
                        .subscribe(function (result) {
                        if (result === true) {
                            _this.router.navigate(['/']);
                        }
                        else {
                            _this.error = 'Usuario no válido';
                            _this.loading = false;
                        }
                    });
                };
                return LoginFormComponent;
            }());
            LoginFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/login/login-form.component.html'
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    authentication_service_1.AuthenticationService])
            ], LoginFormComponent);
            exports_1("LoginFormComponent", LoginFormComponent);
        }
    };
});
//# sourceMappingURL=login-form.component.js.map