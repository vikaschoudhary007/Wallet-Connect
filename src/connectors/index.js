import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';


const REACT_APP_NETWORK_URL = process.env.REACT_APP_NETWORK_URL;


export const NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1');

if (typeof REACT_APP_NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`);
}



export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 4: REACT_APP_NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});


// mainnet only
export const walletlink = new WalletLinkConnector({
  url: REACT_APP_NETWORK_URL,
  appName: 'Swap',
  // appLogoUrl: '',
});
