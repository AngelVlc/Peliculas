System.register(["@angular/core", "../../_services/master.service", "@angular/router", "../../_services/authentication.service", "../../_helpers/forms.helper"], function (exports_1, context_1) {
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
    var core_1, master_service_1, router_1, authentication_service_1, forms_helper_1, MasterListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (master_service_1_1) {
                master_service_1 = master_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (forms_helper_1_1) {
                forms_helper_1 = forms_helper_1_1;
            }
        ],
        execute: function () {
            /*
            Para usar las listas en otro sitio (ej dashboard html)
            <master-list masterType="0" #types></master-list>
            <master-list masterType="1" #locations></master-list>
            */
            MasterListComponent = (function () {
                function MasterListComponent(route, masterService, authenticationService, formsHelper) {
                    this.route = route;
                    this.masterService = masterService;
                    this.authenticationService = authenticationService;
                    this.formsHelper = formsHelper;
                    this.fromDashboard = true;
                    if (route.snapshot.data[0]) {
                        //puedo llegar aquí desde un enlace del menu y en ese caso no hay data                  
                        this.masterType = route.snapshot.data[0].masterType;
                        this.fromDashboard = false;
                    }
                }
                MasterListComponent.prototype.getRoute = function () {
                    switch (this.masterType) {
                        case '0':
                            return '/type';
                        case '1':
                            return '/loc';
                        default:
                            break;
                    }
                };
                MasterListComponent.prototype.getAll = function () {
                    var _this = this;
                    this.masterService.getAll(this.masterType)
                        .subscribe(function (data) { _this.items = data; });
                };
                MasterListComponent.prototype.ngOnInit = function () {
                    this.getAll();
                };
                MasterListComponent.prototype.getFilmsCount = function () {
                    var sum = 0;
                    for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        sum += item.count;
                    }
                    return sum;
                };
                return MasterListComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], MasterListComponent.prototype, "masterType", void 0);
            MasterListComponent = __decorate([
                core_1.Component({
                    selector: 'master-list',
                    templateUrl: './app/masters/mastersList/masters-list.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    master_service_1.MasterService,
                    authentication_service_1.AuthenticationService,
                    forms_helper_1.FormsHelper])
            ], MasterListComponent);
            exports_1("MasterListComponent", MasterListComponent);
        }
    };
});
//# sourceMappingURL=masters-list.component.js.map