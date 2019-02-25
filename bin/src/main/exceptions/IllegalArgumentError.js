"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Thrown when some combination of [[IRdfProperty]] keys are not allowed
 */
var IllegalArgumentError = /** @class */ (function (_super) {
    __extends(IllegalArgumentError, _super);
    function IllegalArgumentError(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = 'IllegalArgumentError';
        Object.setPrototypeOf(_this, IllegalArgumentError.prototype);
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return IllegalArgumentError;
}(Error));
exports.IllegalArgumentError = IllegalArgumentError;
//# sourceMappingURL=IllegalArgumentError.js.map