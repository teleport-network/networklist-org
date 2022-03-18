/**
 * Instead of editing next-env.d.ts, 
 * you can include additional types by adding a new file e.g. additional.d.ts 
 * and then referencing it in the include array in your tsconfig.json.
 */
declare global {
    interface Window { 
        ethereum?: any;
        web3?: any;
        keplr?: any;
    }
}

/**
 * This make Typescript recognize this file
 */
export {}