System.register(["@angular/core", "@angular/router"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var core_1, router_1, MyErrorHandler;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            MyErrorHandler = (function (_super) {
                __extends(MyErrorHandler, _super);
                function MyErrorHandler(router, rethrowError) {
                    var _this = 
                    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
                    // when an error happens. If we do not rethrow, bootstrap will always succeed.
                    _super.call(this, true) || this;
                    _this.router = router;
                    return _this;
                }
                MyErrorHandler.prototype.handleError = function (error) {
                    // send the error to the server
                    console.log(JSON.stringify(error));
                    switch (error.status) {
                        case 401:
                            alert(JSON.stringify(error));
                            //this.router.navigate(['/error401']);
                            break;
                        default:
                            // delegate to the default handler
                            _super.prototype.handleError.call(this, error);
                    }
                };
                MyErrorHandler.prototype.prueba = function () {
                };
                return MyErrorHandler;
            }(core_1.ErrorHandler));
            MyErrorHandler = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [router_1.Router, Boolean])
            ], MyErrorHandler);
            exports_1("MyErrorHandler", MyErrorHandler);
        }
    };
});
//# sourceMappingURL=error.handler.js.map