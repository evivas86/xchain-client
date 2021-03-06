"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeType = exports.FeeOption = exports.TxType = exports.Network = void 0;
var Network;
(function (Network) {
    Network["Mainnet"] = "mainnet";
    Network["Stagenet"] = "stagenet";
    Network["Testnet"] = "testnet";
})(Network = exports.Network || (exports.Network = {}));
var TxType;
(function (TxType) {
    TxType["Transfer"] = "transfer";
    TxType["Unknown"] = "unknown";
})(TxType = exports.TxType || (exports.TxType = {}));
var FeeOption;
(function (FeeOption) {
    FeeOption["Average"] = "average";
    FeeOption["Fast"] = "fast";
    FeeOption["Fastest"] = "fastest";
})(FeeOption = exports.FeeOption || (exports.FeeOption = {}));
var FeeType;
(function (FeeType) {
    FeeType["FlatFee"] = "base";
    FeeType["PerByte"] = "byte";
})(FeeType = exports.FeeType || (exports.FeeType = {}));
//# sourceMappingURL=types.js.map