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
 * Thrown when invalid turtle string is passed to deserialize function
 */
var TurtleParseError = /** @class */ (function (_super) {
    __extends(TurtleParseError, _super);
    function TurtleParseError(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = 'TurtleParseError';
        Object.setPrototypeOf(_this, TurtleParseError.prototype);
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return TurtleParseError;
}(Error));
exports.TurtleParseError = TurtleParseError;
//# sourceMappingURL=TurtleParseError.js.map