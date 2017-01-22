System.register(["@angular/core", "@angular/http", "@angular/router", "./authentication.service", "rxjs/add/operator/map", "rxjs/add/operator/catch", "./error-handler.service"], function (exports_1, context_1) {
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
    var core_1, http_1, router_1, authentication_service_1, error_handler_service_1, UserService;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (error_handler_service_1_1) {
                error_handler_service_1 = error_handler_service_1_1;
            }
        ],
        execute: function () {
            UserService = (function () {
                function UserService(router, http, authenticationService, errorHandlerService) {
                    this.router = router;
                    this.http = http;
                    this.authenticationService = authenticationService;
                    this.errorHandlerService = errorHandlerService;
                    this._baseUrl = '/api/users/';
                }
                UserService.prototype.getUsers = function () {
                    return this.http
                        .get(this._baseUrl, this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return r.json(); })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                UserService.prototype.getUserById = function (userId) {
                    return this.http
                        .get(this._baseUrl + userId, this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return r.json(); })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                UserService.prototype.updateUser = function (user) {
                    var body = {
                        userId: user.userId,
                        userName: user.userName,
                        password: user.password,
                        isAdmin: user.isAdmin
                    };
                    return this.http
                        .put(this._baseUrl + user.userId, body, this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return true; })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                UserService.prototype.deleteUser = function (user) {
                    return this.http
                        .delete(this._baseUrl + user.userId, this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return true; })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                UserService.prototype.insertUser = function (user) {
                    return this.http
                        .post(this._baseUrl, user, this.authenticationService.getRequestOptionsWithAuth())
                        .map(function (r) { return true; })
                        .catch(this.errorHandlerService.handleError.bind(this));
                };
                return UserService;
            }());
            UserService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router,
                    http_1.Http,
                    authentication_service_1.AuthenticationService,
                    error_handler_service_1.ErrorHandlerService])
            ], UserService);
            exports_1("UserService", UserService);
        }
    };
});
//# sourceMappingURL=user.service.js.map