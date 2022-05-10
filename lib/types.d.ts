import { Asset, BaseAmount } from '@xchainjs/xchain-util';
export declare type Address = string;
export declare enum Network {
    Mainnet = "mainnet",
    Stagenet = "stagenet",
    Testnet = "testnet"
}
export declare type Balance = {
    asset: Asset;
    amount: BaseAmount;
};
export declare enum TxType {
    Transfer = "transfer",
    Unknown = "unknown"
}
export declare type TxHash = string;
export declare type TxTo = {
    to: Address;
    amount: BaseAmount;
    asset?: Asset;
};
export declare type TxFrom = {
    from: Address | TxHash;
    amount: BaseAmount;
    asset?: Asset;
};
export declare type Tx = {
    asset: Asset;
    from: TxFrom[];
    to: TxTo[];
    date: Date;
    type: TxType;
    hash: string;
};
export declare type TxsPage = {
    total: number;
    txs: Tx[];
};
export declare type TxHistoryParams = {
    address: Address;
    offset?: number;
    limit?: number;
    startTime?: Date;
    asset?: string;
};
export declare type TxParams = {
    walletIndex?: number;
    asset?: Asset;
    amount: BaseAmount;
    recipient: Address;
    memo?: string;
};
export declare type DepositParams = {
    walletIndex?: number;
    asset?: Asset;
    amount: BaseAmount;
    memo: string;
};
export declare enum FeeOption {
    Average = "average",
    Fast = "fast",
    Fastest = "fastest"
}
export declare type FeeRate = number;
export declare type FeeRates = Record<FeeOption, FeeRate>;
export declare enum FeeType {
    FlatFee = "base",
    PerByte = "byte"
}
export declare type Fee = BaseAmount;
export declare type Fees = Record<FeeOption, Fee> & {
    type: FeeType;
};
export declare type FeesWithRates = {
    rates: FeeRates;
    fees: Fees;
};
export declare type FeeBounds = {
    lower: number;
    upper: number;
};
export declare type RootDerivationPaths = Record<Network, string>;
export declare type XChainClientParams = {
    network?: Network;
    phrase?: string;
    feeBounds?: FeeBounds;
    rootDerivationPaths?: RootDerivationPaths;
};
export interface XChainClient {
    setNetwork(net: Network): void;
    getNetwork(): Network;
    getExplorerUrl(): string;
    getExplorerAddressUrl(address: Address): string;
    getExplorerTxUrl(txID: string): string;
    validateAddress(address: string): boolean;
    getAddress(walletIndex?: number): Address;
    setPhrase(phrase: string, walletIndex: number): Address;
    getBalance(address: Address, assets?: Asset[]): Promise<Balance[]>;
    getTransactions(params?: TxHistoryParams): Promise<TxsPage>;
    getTransactionData(txId: string, assetAddress?: Address): Promise<Tx>;
    getFees(): Promise<Fees>;
    transfer(params: TxParams): Promise<TxHash>;
    purgeClient(): void;
}
