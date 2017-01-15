System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, MyErrorHandler;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            MyErrorHandler = (function (_super) {
                __extends(MyErrorHandler, _super);
                function MyErrorHandler() {
                    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
                    // when an error happens. If we do not rethrow, bootstrap will always succeed.
                    return _super.call(this, true) || this;
                }
                MyErrorHandler.prototype.handleError = function (error) {
                    // send the error to the server
                    // delegate to the default handler
                    _super.prototype.handleError.call(this, error);
                };
                return MyErrorHandler;
            }(core_1.ErrorHandler));
            exports_1("MyErrorHandler", MyErrorHandler);
        }
    };
});
//# sourceMappingURL=error.handler.js.map