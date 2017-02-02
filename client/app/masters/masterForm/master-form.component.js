System.register(["@angular/core", "../../_models/master", "../../_services/master.service", "rxjs/Observable", "@angular/router", "../../_helpers/forms.helper", "../../_services/authentication.service", "rxjs/add/operator/switchMap"], function (exports_1, context_1) {
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
    var core_1, master_1, master_service_1, Observable_1, router_1, forms_helper_1, authentication_service_1, MasterFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (master_1_1) {
                master_1 = master_1_1;
            },
            function (master_service_1_1) {
                master_service_1 = master_service_1_1;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            MasterFormComponent = (function () {
                function MasterFormComponent(route, authService, router, masterService, formsHelper) {
                    this.route = route;
                    this.authService = authService;
                    this.router = router;
                    this.masterService = masterService;
                    this.formsHelper = formsHelper;
                    this.error = '';
                    this.success = false;
                    this.masterType = route.snapshot.data[0].masterType;
                }
                MasterFormComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params
                        .switchMap(function (params) {
                        var itemId = +params['id'];
                        if (itemId > 0) {
                            return _this.masterService.getById(_this.masterType, itemId);
                        }
                        else {
                            return Observable_1.Observable.of(new master_1.Master()).map(function (o) { return new master_1.Master(); });
                        }
                    })
                        .subscribe(function (data) {
                        _this.item = data;
                        switch (_this.masterType) {
                            case '0':
                                if (_this.item.id) {
                                    _this.title = 'Tipo \'' + _this.item.name + '\'';
                                }
                                else {
                                    _this.title = 'Nuevo tipo';
                                }
                                break;
                            case '1':
                                if (_this.item.id) {
                                    _this.title = 'Localización \'' + _this.item.name + '\'';
                                }
                                else {
                                    _this.title = 'Nueva localización';
                                }
                                break;
                            default:
                                break;
                        }
                    });
                };
                MasterFormComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.item.id) {
                        this.masterService.updateItem(this.masterType, this.item)
                            .subscribe(function (data) {
                            _this.success = true;
                        });
                    }
                    else {
                        this.masterService.insertItem(this.masterType, this.item)
                            .subscribe(function (data) {
                            _this.router.navigate(['/']);
                        });
                    }
                };
                MasterFormComponent.prototype.deleteItem = function () {
                    var _this = this;
                    this.masterService.deleteItem(this.masterType, this.item)
                        .subscribe(function (data) {
                        _this.router.navigate(['/']);
                    });
                };
                MasterFormComponent.prototype.isReadOnly = function () {
                    return !this.authService.isUserLogedAdmin();
                };
                return MasterFormComponent;
            }());
            MasterFormComponent = __decorate([
                core_1.Component({
                    templateUrl: './app/masters/masterForm/master-form.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    authentication_service_1.AuthenticationService,
                    router_1.Router,
                    master_service_1.MasterService,
                    forms_helper_1.FormsHelper])
            ], MasterFormComponent);
            exports_1("MasterFormComponent", MasterFormComponent);
        }
    };
});
//# sourceMappingURL=master-form.component.js.map