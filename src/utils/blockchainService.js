import { Network, Alchemy } from 'alchemy-sdk';
import.meta.env.VITE_ALCHEMY_KEY

/**
 * Dynamically configures Alchemy based on the selected network
 */
const getAlchemyInstance = (networkKey) => {
  const settings = {
    apiKey: "VITE_ALCHEMY_KEY", 
    network: Network[networkKey] || Network.ETH_MAINNET,
  };
  return new Alchemy(settings);
};

export const getLiveWalletData = async (address, networkKey) => {
  const alchemy = getAlchemyInstance(networkKey);
  
  try {
    // 1. Fetch Token Balances
    // This returns the number of tokens the wallet holds/interacts with
    const balances = await alchemy.core.getTokenBalances(address);

    // 2. Fetch Transaction Count
    // Useful for determining wallet age and activity levels
    const txCount = await alchemy.core.getTransactionCount(address);

    // 3. Fetch Native Balance (ETH, MATIC, etc.)
    const balance = await alchemy.core.getBalance(address);

    // 4. Determine if the address is a Smart Contract or a User Wallet (EOA)
    const code = await alchemy.core.getCode(address);
    const isContract = code !== "0x";

    return {
      approvalCount: balances.tokenBalances.length,
      txCount: txCount,
      ethBalance: parseFloat(balance.toString()) / 10**18,
      isContract: isContract,
      networkName: networkKey.split('_')[0] // Extracts "ETH" from "ETH_MAINNET"
    };
  } catch (error) {
    console.error("Blockchain API Error:", error);
    return null;
  }
};