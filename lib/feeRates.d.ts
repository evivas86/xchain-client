import { FeeRate, FeeRates, FeeBounds } from './types';
export declare function singleFeeRate(rate: FeeRate): FeeRates;
export declare function standardFeeRates(rate: FeeRate): FeeRates;
export declare function checkFeeBounds(feeBounds: FeeBounds, feeRate: FeeRate): void;
