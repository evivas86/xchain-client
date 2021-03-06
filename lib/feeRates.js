"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFeeBounds = exports.standardFeeRates = exports.singleFeeRate = void 0;
var types_1 = require("./types");
function singleFeeRate(rate) {
    return Object.values(types_1.FeeOption).reduce(function (a, x) { return ((a[x] = rate), a); }, {});
}
exports.singleFeeRate = singleFeeRate;
function standardFeeRates(rate) {
    var _a;
    return __assign(__assign({}, singleFeeRate(rate)), (_a = {}, _a[types_1.FeeOption.Average] = rate * 0.5, _a[types_1.FeeOption.Fastest] = rate * 5.0, _a));
}
exports.standardFeeRates = standardFeeRates;
function checkFeeBounds(feeBounds, feeRate) {
    if (feeRate < feeBounds.lower || feeRate > feeBounds.upper) {
        throw Error("Fee outside of predetermined bounds: ".concat(feeRate.toString()));
    }
}
exports.checkFeeBounds = checkFeeBounds;
//# sourceMappingURL=feeRates.js.map