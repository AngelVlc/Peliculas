System.register(["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, http_1, AuthenticationService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            AuthenticationService = (function () {
                function AuthenticationService(http) {
                    this.http = http;
                    // set token if saved in local storage
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    this.token = currentUser && currentUser.token;
                }
                AuthenticationService.prototype.login = function (username, password) {
                    var _this = this;
                    var body = {
                        name: username,
                        password: password
                    };
                    return this.http.post('/api/authenticate', body)
                        .map(function (response) {
                        // login successful if there's a jwt token in the response
                        var token = response.json() && response.json().token;
                        if (token) {
                            // set token property
                            _this.token = token;
                            // store username and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, roles: response.json().roles }));
                            // return true to indicate successful login
                            return true;
                        }
                        else {
                            // return false to indicate failed login
                            throw new Error('Authenticate response without token');
                        }
                    });
                };
                AuthenticationService.prototype.logout = function () {
                    // clear token remove user from local storage to log user out
                    this.token = null;
                    localStorage.removeItem('currentUser');
                };
                AuthenticationService.prototype.isUserLoged = function () {
                    if (this.getCurrentUser()) {
                        return true;
                    }
                    return false;
                };
                AuthenticationService.prototype.getCurrentUser = function () {
                    return JSON.parse(localStorage.getItem('currentUser'));
                };
                AuthenticationService.prototype.getCurrentUserName = function () {
                    if (this.isUserLoged()) {
                        return this.getCurrentUser().username.toLowerCase();
                    }
                    else {
                        return null;
                    }
                };
                AuthenticationService.prototype.isUserLogedAdmin = function () {
                    var currentUser = this.getCurrentUser();
                    if (currentUser && currentUser.roles.indexOf('ADMIN', 0) >= 0) {
                        return true;
                    }
                    return false;
                };
                AuthenticationService.prototype.getRequestOptionsWithAuth = function () {
                    var currentUser = this.getCurrentUser();
                    if (currentUser && currentUser.token) {
                        var headers = new http_1.Headers();
                        headers.append('x-access-token', currentUser.token);
                        headers.append('cache-control', 'no-chache');
                        return new http_1.RequestOptions({ headers: headers });
                    }
                    return null;
                };
                return AuthenticationService;
            }());
            AuthenticationService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], AuthenticationService);
            exports_1("AuthenticationService", AuthenticationService);
        }
    };
});
//# sourceMappingURL=authentication.service.js.map