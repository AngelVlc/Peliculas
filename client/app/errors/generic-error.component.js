System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, GenericErrorComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            GenericErrorComponent = (function () {
                function GenericErrorComponent() {
                }
                return GenericErrorComponent;
            }());
            GenericErrorComponent = __decorate([
                core_1.Component({
                    template: "\n    <div class=\"container\">\n      <h3>Ocurri\u00F3 un error inesperado</h3>\n\n      <div class=\"panel-body\">\n\n      </div>\n    </div>  \n"
                }),
                __metadata("design:paramtypes", [])
            ], GenericErrorComponent);
            exports_1("GenericErrorComponent", GenericErrorComponent);
        }
    };
});
//# sourceMappingURL=generic-error.component.js.map