import React from 'react';
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import {SUPPORTED_WALLETS} from "../constants"
import {injected} from "../connectors"

function Home() {

    const {active, account, activate, connector, chainId, error} = useWeb3React()
    console.log(active, account, connector, chainId, error);

    function getOptions() {
      const isMetamask = window.ethereum && window.ethereum.isMetaMask;
      return Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key];

        if(option.connector === injected){

          if(!(window.web3 || window.ethereum)){
            if(option.name === "MetaMask"){
              return (
                <div>
                  <ul>
                    <li>id : {`connect-${key}`}</li>
                    <li>key : {key}</li>
                    <li>Header : Install METAMASK</li>
                    <li>Link : {'https://metamask.io/'}</li>
                  </ul>
                </div>
              )
            }
            else{
              return null;
            }
            
          }
          else if(option.name === "MetaMask" && !isMetamask) {
            return null;
          }
          else if(option.name === "Injected" && isMetamask){
            return null;
          }
        }
        
        return (
          <div >
                  <ul>
                    <li>id : {`connect-${key}`}</li>
                    <li>key : {key}</li>
                    <li>Header : {option.name}</li>
                    
                    <button  onClick={() => {tryActivation(option.connector)}}>Connect</button>
                  </ul>
                </div>
        )

      })
    }

    function tryActivation(connector) {
       // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }

      connector && 
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
          alert("Wrong Network")
        } 
        else {
          
        }
      });
    }

    function handleDisconnect() {
      connector.close()
    }
    
    return (
      <div >
        <p>Hello</p>
        {getOptions()}

        <button onClick={() => handleDisconnect()}>Disconnect</button>

        <p>account : {account} </p>
        <p>ChainId : {chainId} </p>
      </div>
      
    )
    
}

export default Home