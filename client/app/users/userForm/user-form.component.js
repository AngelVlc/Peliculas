System.register(["@angular/core", "../../_models/user", "../../_services/user.service", "rxjs/Observable", "@angular/router", "../../_helpers/forms.helper", "rxjs/add/operator/switchMap"], function (exports_1, context_1) {
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
    var core_1, user_1, user_service_1, Observable_1, router_1, forms_helper_1, UserFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_helper_1_1) {
                forms_helper_1 = forms_helper_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            UserFormComponent = (function () {
                function UserFormComponent(route, router, userService, formsHelper) {
                    this.route = route;
                    this.router = router;
                    this.userService = userService;
                    this.formsHelper = formsHelper;
                    this.error = '';
                    this.success = false;
                }
                UserFormComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params
                        .switchMap(function (params) {
                        var userId = +params['id'];
                        if (userId > 0) {
                            return _this.userService.getUserById(userId);
                        }
                        else {
                            return Observable_1.Observable.of(new user_1.User()).map(function (o) { return new user_1.User(); });
                        }
                    })
                        .subscribe(function (data) {
                        _this.user = data;
                        if (_this.user.userId) {
                            _this.title = 'Usuario ' + _this.user.userName;
                        }
                        else {
                            _this.title = 'Nuevo usuario';
                        }
                    });
                };
                UserFormComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.user.userId) {
                        this.userService.updateUser(this.user)
                            .subscribe(function (data) {
                            _this.success = true;
                        });
                    }
                    else {
                        this.userService.insertUser(this.user)
                            .subscribe(function (data) {
                            _this.router.navigate(['/usersList']);
                        });
                    }
                };
                UserFormComponent.prototype.deleteUser = function () {
                    var _this = this;
                    this.userService.deleteUser(this.user)
                        .subscribe(function (data) {
                        _this.router.navigate(['/usersList']);
                    });
                };
                return UserFormComponent;
            }());
            UserFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/users/userForm/user-form.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    user_service_1.UserService,
                    forms_helper_1.FormsHelper])
            ], UserFormComponent);
            exports_1("UserFormComponent", UserFormComponent);
        }
    };
});
//# sourceMappingURL=user-form.component.js.map