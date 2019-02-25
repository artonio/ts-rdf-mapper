"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ISODateSerializer = /** @class */ (function () {
    function ISODateSerializer() {
    }
    ISODateSerializer.prototype.serialize = function (value) {
        return value.toISOString();
    };
    return ISODateSerializer;
}());
exports.ISODateSerializer = ISODateSerializer;
//# sourceMappingURL=ISODateSerializer.js.map