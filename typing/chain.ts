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

