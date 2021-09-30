import React from 'react';
import { ethers } from 'ethers'
import './PageContents.css';
import Header from '../Header/Header';
import ConnectToMetaMask from '../ConnectToMetaMask/ConnectToMetaMask';
import Signer from '../Signer/Signer';

export default class PageContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {provider: null};
    }

    async connectToMetaMask() {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.setState({
            provider: new ethers.providers.Web3Provider(window.ethereum)
        })
    }

    render() {
        return (
            <div className="PageContents--parent">
                <div className="PageContents--container">
                    <Header />
                </div>
                <div className="PageContents--container">
                    <ConnectToMetaMask onClick={this.connectToMetaMask.bind(this)} provider={this.state.provider} />
                </div>
                <div className="PageContents--container">
                    <Signer provider={this.state.provider} />
                </div>
            </div>
        );
    }
}
