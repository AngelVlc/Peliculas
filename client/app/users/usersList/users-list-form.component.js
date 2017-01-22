System.register(["@angular/core", "../../_services/user.service"], function (exports_1, context_1) {
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
    var core_1, user_service_1, UsersListFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }
        ],
        execute: function () {
            UsersListFormComponent = (function () {
                function UsersListFormComponent(userService) {
                    this.userService = userService;
                }
                UsersListFormComponent.prototype.getUsers = function () {
                    var _this = this;
                    this.userService.getUsers()
                        .subscribe(function (data) { _this.users = data; });
                };
                UsersListFormComponent.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                return UsersListFormComponent;
            }());
            UsersListFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/users/usersList/users-list-form.component.html'
                }),
                __metadata("design:paramtypes", [user_service_1.UserService])
            ], UsersListFormComponent);
            exports_1("UsersListFormComponent", UsersListFormComponent);
        }
    };
});
//# sourceMappingURL=users-list-form.component.js.map