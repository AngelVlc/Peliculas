System.register(["@angular/platform-browser", "@angular/core", "@angular/forms", "@angular/http", "angular-confirmation-popover", "./app.component", "./app-routing.module", "./login/login-form.component", "./dashboard/dashboard-form.component", "./users/usersList/users-list-form.component", "./users/userForm/user-form.component", "./masters/mastersList/masters-list.component", "./masters/masterForm/master-form.component", "./films/filmsList/films-list.component", "./_guards/auth.user-guard", "./_guards/auth.admin-guard", "./_services/error-handler.service", "./_services/authentication.service", "./_services/user.service", "./_services/master.service", "./_services/film.service", "./_helpers/forms.helper", "./errors/generic-error.component", "./errors/error-401.component", "./errors/error-401-token-expired.component"], function (exports_1, context_1) {
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
    var platform_browser_1, core_1, forms_1, http_1, angular_confirmation_popover_1, app_component_1, app_routing_module_1, login_form_component_1, dashboard_form_component_1, users_list_form_component_1, user_form_component_1, masters_list_component_1, master_form_component_1, films_list_component_1, auth_user_guard_1, auth_admin_guard_1, error_handler_service_1, authentication_service_1, user_service_1, master_service_1, film_service_1, forms_helper_1, generic_error_component_1, error_401_component_1, error_401_token_expired_component_1, AppModule;
    return {
        setters: [
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular_confirmation_popover_1_1) {
                angular_confirmation_popover_1 = angular_confirmation_popover_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_routing_module_1_1) {
                app_routing_module_1 = app_routing_module_1_1;
            },
            function (login_form_component_1_1) {
                login_form_component_1 = login_form_component_1_1;
            },
            function (dashboard_form_component_1_1) {
                dashboard_form_component_1 = dashboard_form_component_1_1;
            },
            function (users_list_form_component_1_1) {
                users_list_form_component_1 = users_list_form_component_1_1;
            },
            function (user_form_component_1_1) {
                user_form_component_1 = user_form_component_1_1;
            },
            function (masters_list_component_1_1) {
                masters_list_component_1 = masters_list_component_1_1;
            },
            function (master_form_component_1_1) {
                master_form_component_1 = master_form_component_1_1;
            },
            function (films_list_component_1_1) {
                films_list_component_1 = films_list_component_1_1;
            },
            function (auth_user_guard_1_1) {
                auth_user_guard_1 = auth_user_guard_1_1;
            },
            function (auth_admin_guard_1_1) {
                auth_admin_guard_1 = auth_admin_guard_1_1;
            },
            function (error_handler_service_1_1) {
                error_handler_service_1 = error_handler_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (master_service_1_1) {
                master_service_1 = master_service_1_1;
            },
            function (film_service_1_1) {
                film_service_1 = film_service_1_1;
            },
            function (forms_helper_1_1) {
                forms_helper_1 = forms_helper_1_1;
            },
            function (generic_error_component_1_1) {
                generic_error_component_1 = generic_error_component_1_1;
            },
            function (error_401_component_1_1) {
                error_401_component_1 = error_401_component_1_1;
            },
            function (error_401_token_expired_component_1_1) {
                error_401_token_expired_component_1 = error_401_token_expired_component_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        app_routing_module_1.AppRoutingModule,
                        angular_confirmation_popover_1.ConfirmationPopoverModule.forRoot({
                            focusButton: 'confirm'
                        })],
                    declarations: [app_component_1.AppComponent,
                        login_form_component_1.LoginFormComponent,
                        dashboard_form_component_1.DashboardFormComponent,
                        users_list_form_component_1.UsersListFormComponent,
                        user_form_component_1.UserFormComponent,
                        masters_list_component_1.MasterListComponent,
                        master_form_component_1.MasterFormComponent,
                        films_list_component_1.FilmListComponent,
                        generic_error_component_1.GenericErrorComponent,
                        error_401_component_1.Error401Component,
                        error_401_token_expired_component_1.Error401TokenExpiredComponent],
                    bootstrap: [app_component_1.AppComponent],
                    providers: [auth_user_guard_1.AuthUserGuard,
                        auth_admin_guard_1.AuthAdminGuard,
                        error_handler_service_1.ErrorHandlerService,
                        authentication_service_1.AuthenticationService,
                        user_service_1.UserService,
                        master_service_1.MasterService,
                        film_service_1.FilmService,
                        forms_helper_1.FormsHelper]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map