export interface EVMChainInfomation {
    name: string;
    shortName: string;
    chain: string;
    /**
     * @Deprecated
     * `network` Will be removed in the future
     */
    network?: string;
    chainId: number;
    networkId: number;
    rpc: string[],
    faucets: string[],
    explorers: {
        name: string;
        url: string;
        standard: string;
    }[],
    infoURL: string;
    title?: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    }
}

export interface CosmosCurrency {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number,
    coinGeckoId: string;
}

export interface CosmosChainInfomation {
    rpc: string; // Address of RPC endpoint of the chain. Default port is 26657
    rest: string; // Address of REST/API endpoint of the chain. Default port is 1317. Must be enabled in app.toml
    chainId: string;	// Keplr has a feature which automatically detects when the chain-id has changed, and automatically update to support new chain. However, it should be noted that this functionality will only work when the chain-id follows the {identifier}-{version}(ex.cosmoshub-4) format. Therefore, it is recommended that the chain follows the chain-id format.
    stakeCurrency: CosmosCurrency;	// Information on the staking token of the chain
    walletUrlForStaking?: string;	// https://wallet.keplr.app/#/cosmoshub/stake	The URL for the staking interface frontend for the chain. If you don't have a staking interface built, you can use Lunie Light (opens new window)which supports Keplr.
    bip44: {
        coinType: number;
    };	// BIP44 coin type for address derivation. We recommend using 118(Cosmos Hub) as this would provide good Ledger hardware wallet compatibility by utilizing the Cosmos Ledger app.
    bech32Config: {
        bech32PrefixAccAddr: string;
        bech32PrefixAccPub: string;
        bech32PrefixValAddr: string;
        bech32PrefixValPub: string;
        bech32PrefixConsAddr: string;
        bech32PrefixConsPub: string;
    }; 	// Bech32 config using the address prefix of the chain
    currencies: Array<CosmosCurrency>,	// (TBD)
    feeCurrencies: Array<CosmosCurrency>,	// List of fee tokens accepted by the chain's validator.
    gasPriceStep: {
        low: number,
        average: number,
        high: number,
    };	// Three gasPrice values (low, average, high) to estimate transaction fee.
    features: string[];
}
