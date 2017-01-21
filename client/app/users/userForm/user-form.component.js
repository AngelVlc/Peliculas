System.register(["@angular/core", "../../_services/user.service", "@angular/router", "rxjs/add/operator/switchMap"], function (exports_1, context_1) {
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
    var core_1, user_service_1, router_1, UserFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            UserFormComponent = (function () {
                function UserFormComponent(route, router, userService) {
                    this.route = route;
                    this.router = router;
                    this.userService = userService;
                    this.error = '';
                }
                UserFormComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params
                        .switchMap(function (params) { return _this.userService.getUserById(+params['id']); })
                        .subscribe(function (data) { return _this.user = data; });
                };
                UserFormComponent.prototype.onSubmit = function () {
                };
                return UserFormComponent;
            }());
            UserFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/users/userForm/user-form.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    user_service_1.UserService])
            ], UserFormComponent);
            exports_1("UserFormComponent", UserFormComponent);
        }
    };
});
//# sourceMappingURL=user-form.component.js.map