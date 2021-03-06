"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseXChainClient = void 0;
var xchain_crypto_1 = require("@xchainjs/xchain-crypto");
var axios_1 = require("axios");
var types_1 = require("./types");
var MAINNET_THORNODE_API_BASE = 'https://thornode.ninerealms.com/thorchain';
var STAGENET_THORNODE_API_BASE = 'https://stagenet-thornode.ninerealms.com/thorchain';
var TESTNET_THORNODE_API_BASE = 'https://testnet.thornode.thorchain.info/thorchain';
var BaseXChainClient = /** @class */ (function () {
    /**
     * Constructor
     *
     * Client has to be initialised with network type and phrase.
     * It will throw an error if an invalid phrase has been passed.
     *
     * @param {XChainClientParams} params
     *
     * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
     */
    function BaseXChainClient(chain, params) {
        this.phrase = '';
        this.chain = chain;
        this.network = params.network || types_1.Network.Testnet;
        this.feeBounds = params.feeBounds || { lower: 1, upper: Infinity };
        // Fire off a warning in the console to indicate that stagenet and real assets are being used.
        if (this.network === types_1.Network.Stagenet)
            console.warn('WARNING: This is using stagenet! Real assets are being used!');
        if (params.rootDerivationPaths)
            this.rootDerivationPaths = params.rootDerivationPaths;
        //NOTE: we don't call this.setPhrase() to vaoid generating an address and paying the perf penalty
        if (params.phrase) {
            if (!(0, xchain_crypto_1.validatePhrase)(params.phrase)) {
                throw new Error('Invalid phrase');
            }
            this.phrase = params.phrase;
        }
    }
    /**
     * Set/update the current network.
     *
     * @param {Network} network
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    BaseXChainClient.prototype.setNetwork = function (network) {
        if (!network) {
            throw new Error('Network must be provided');
        }
        this.network = network;
        // Fire off a warning in the console to indicate that stagenet and real assets are being used.
        if (this.network === types_1.Network.Stagenet)
            console.warn('WARNING: This is using stagenet! Real assets are being used!');
    };
    /**
     * Get the current network.
     *
     * @returns {Network}
     */
    BaseXChainClient.prototype.getNetwork = function () {
        return this.network;
    };
    BaseXChainClient.prototype.getFeeRateFromThorchain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respData, chainData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.thornodeAPIGet('/inbound_addresses')];
                    case 1:
                        respData = _a.sent();
                        if (!Array.isArray(respData))
                            throw new Error('bad response from Thornode API');
                        chainData = respData.find(function (elem) { return elem.chain === _this.chain && typeof elem.gas_rate === 'string'; });
                        if (!chainData)
                            throw new Error("Thornode API /inbound_addresses does not contain fees for ".concat(this.chain));
                        return [2 /*return*/, Number(chainData.gas_rate)];
                }
            });
        });
    };
    BaseXChainClient.prototype.thornodeAPIGet = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (function () {
                            switch (_this.network) {
                                case types_1.Network.Mainnet:
                                    return MAINNET_THORNODE_API_BASE;
                                case types_1.Network.Stagenet:
                                    return STAGENET_THORNODE_API_BASE;
                                case types_1.Network.Testnet:
                                    return TESTNET_THORNODE_API_BASE;
                            }
                        })();
                        return [4 /*yield*/, axios_1.default.get(url + endpoint)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Set/update a new phrase
     *
     * @param {string} phrase A new phrase.
     * @param {number} walletIndex (optional) HD wallet index
     * @returns {Address} The address from the given phrase
     *
     * @throws {"Invalid phrase"}
     * Thrown if the given phase is invalid.
     */
    BaseXChainClient.prototype.setPhrase = function (phrase, walletIndex) {
        if (walletIndex === void 0) { walletIndex = 0; }
        if (this.phrase !== phrase) {
            if (!(0, xchain_crypto_1.validatePhrase)(phrase)) {
                throw new Error('Invalid phrase');
            }
            this.phrase = phrase;
        }
        return this.getAddress(walletIndex);
    };
    /**
     * Get getFullDerivationPath
     *
     * @param {number} walletIndex HD wallet index
     * @returns {string} The bitcoin derivation path based on the network.
     */
    BaseXChainClient.prototype.getFullDerivationPath = function (walletIndex) {
        return this.rootDerivationPaths ? "".concat(this.rootDerivationPaths[this.network]).concat(walletIndex) : '';
    };
    /**
     * Purge client.
     *
     * @returns {void}
     */
    BaseXChainClient.prototype.purgeClient = function () {
        this.phrase = '';
    };
    return BaseXChainClient;
}());
exports.BaseXChainClient = BaseXChainClient;
//# sourceMappingURL=BaseXChainClient.js.map