System.register(["@angular/core", "@angular/http", "@angular/router", "rxjs/Observable", "./authentication.service", "rxjs/add/operator/map", "rxjs/add/operator/catch", "rxjs/add/observable/throw", "rxjs/add/observable/of"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, Observable_1, authentication_service_1, UserService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            }
        ],
        execute: function () {
            UserService = (function () {
                function UserService(router, http, authenticationService) {
                    this.router = router;
                    this.http = http;
                    this.authenticationService = authenticationService;
                }
                UserService.prototype.getUsers = function () {
                    return this.http
                        .get('/api/users', this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return r.json(); })
                        .catch(this.handleError.bind(this));
                };
                UserService.prototype.handleError = function (error) {
                    switch (error.status) {
                        case 401:
                            if (error._body.indexOf('jwt expired') > 0) {
                                this.router.navigate(['/error401TokenExpired']);
                            }
                            else {
                                this.router.navigate(['/error401']);
                            }
                            break;
                        default:
                            this.router.navigate(['/genericError']);
                    }
                    return Observable_1.Observable.of();
                };
                return UserService;
            }());
            UserService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router,
                    http_1.Http,
                    authentication_service_1.AuthenticationService])
            ], UserService);
            exports_1("UserService", UserService);
        }
    };
});
//# sourceMappingURL=user.service.js.map