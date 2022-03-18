import { CosmosChainInfomation } from "../typing/chain";

export const requestKeplrToAddCosmosChain = async (chainData: CosmosChainInfomation) => {
    console.debug('requestKeplrToAddCosmosChain::start')
    await window.keplr.experimentalSuggestChain(chainData)
    console.debug('requestKeplrToAddCosmosChain::finish')
};