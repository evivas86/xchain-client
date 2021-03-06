import { Asset, Chain } from '@xchainjs/xchain-util';
import { Address, Balance, FeeBounds, FeeRate, Fees, Network, RootDerivationPaths, Tx, TxHistoryParams, TxParams, TxsPage, XChainClient, XChainClientParams } from './types';
export declare abstract class BaseXChainClient implements XChainClient {
    protected chain: Chain;
    protected network: Network;
    protected feeBounds: FeeBounds;
    protected phrase: string;
    protected rootDerivationPaths: RootDerivationPaths | undefined;
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
    constructor(chain: Chain, params: XChainClientParams);
    /**
     * Set/update the current network.
     *
     * @param {Network} network
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork(network: Network): void;
    /**
     * Get the current network.
     *
     * @returns {Network}
     */
    getNetwork(): Network;
    protected getFeeRateFromThorchain(): Promise<FeeRate>;
    protected thornodeAPIGet(endpoint: string): Promise<unknown>;
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
    setPhrase(phrase: string, walletIndex?: number): Address;
    /**
     * Get getFullDerivationPath
     *
     * @param {number} walletIndex HD wallet index
     * @returns {string} The bitcoin derivation path based on the network.
     */
    protected getFullDerivationPath(walletIndex: number): string;
    /**
     * Purge client.
     *
     * @returns {void}
     */
    purgeClient(): void;
    abstract getFees(): Promise<Fees>;
    abstract getAddress(walletIndex?: number): string;
    abstract getExplorerUrl(): string;
    abstract getExplorerAddressUrl(address: string): string;
    abstract getExplorerTxUrl(txID: string): string;
    abstract validateAddress(address: string): boolean;
    abstract getBalance(address: string, assets?: Asset[]): Promise<Balance[]>;
    abstract getTransactions(params?: TxHistoryParams): Promise<TxsPage>;
    abstract getTransactionData(txId: string, assetAddress?: string): Promise<Tx>;
    abstract transfer(params: TxParams): Promise<string>;
}
