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
    var core_1, FormsHelper;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            FormsHelper = (function () {
                function FormsHelper() {
                    this.confirmDeleteTitle = '¿Está seguro?';
                    this.confirmDeleteText = 'Si';
                    this.confirmCancelText = 'No';
                    this.yesNoValues = [
                        { value: 0, display: 'No' },
                        { value: 1, display: 'Si' }
                    ];
                }
                FormsHelper.prototype.getMasterName = function (masterType) {
                    switch (masterType) {
                        case '0':
                            return 'tipos';
                        case '1':
                            return 'localizaziones';
                        default:
                            break;
                    }
                };
                return FormsHelper;
            }());
            FormsHelper = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], FormsHelper);
            exports_1("FormsHelper", FormsHelper);
        }
    };
});
//# sourceMappingURL=forms.helper.js.map