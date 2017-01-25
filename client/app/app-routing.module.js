System.register(["@angular/router", "./login/login-form.component", "./dashboard/dashboard-form.component", "./users/usersList/users-list-form.component", "./users/userForm/user-form.component", "./masters/list-component", "./errors/generic-error.component", "./errors/error-401.component", "./errors/error-401-token-expired.component", "./_guards/auth.user-guard", "./_guards/auth.admin-guard"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, login_form_component_1, dashboard_form_component_1, users_list_form_component_1, user_form_component_1, list_component_1, generic_error_component_1, error_401_component_1, error_401_token_expired_component_1, auth_user_guard_1, auth_admin_guard_1, routes, AppRoutingModule;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (list_component_1_1) {
                list_component_1 = list_component_1_1;
            },
            function (generic_error_component_1_1) {
                generic_error_component_1 = generic_error_component_1_1;
            },
            function (error_401_component_1_1) {
                error_401_component_1 = error_401_component_1_1;
            },
            function (error_401_token_expired_component_1_1) {
                error_401_token_expired_component_1 = error_401_token_expired_component_1_1;
            },
            function (auth_user_guard_1_1) {
                auth_user_guard_1 = auth_user_guard_1_1;
            },
            function (auth_admin_guard_1_1) {
                auth_admin_guard_1 = auth_admin_guard_1_1;
            }
        ],
        execute: function () {
            routes = [
                { path: 'login', component: login_form_component_1.LoginFormComponent },
                { path: 'usersList', component: users_list_form_component_1.UsersListFormComponent, canActivate: [auth_admin_guard_1.AuthAdminGuard] },
                { path: 'user/:id', component: user_form_component_1.UserFormComponent, canActivate: [auth_admin_guard_1.AuthAdminGuard] },
                { path: 'types', component: list_component_1.MasterListComponent, data: [{ masterType: "0" }] },
                { path: 'locs', component: list_component_1.MasterListComponent, data: [{ masterType: "1" }] },
                { path: 'genericError', component: generic_error_component_1.GenericErrorComponent },
                { path: 'error401', component: error_401_component_1.Error401Component },
                { path: 'error401TokenExpired', component: error_401_token_expired_component_1.Error401TokenExpiredComponent },
                { path: '', component: dashboard_form_component_1.DashboardFormComponent, canActivate: [auth_user_guard_1.AuthUserGuard] },
                { path: '**', redirectTo: '' },
            ];
            exports_1("AppRoutingModule", AppRoutingModule = router_1.RouterModule.forRoot(routes));
        }
    };
});
//# sourceMappingURL=app-routing.module.js.map