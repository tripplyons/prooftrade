import React from 'react';
// import { ethers } from 'ethers'
import './Signer.css';
import LabeledTextInput from '../LabeledTextInput/LabeledTextInput';

export default class Signer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to: "",
            expiration: ""
        };
    }

    async trySigning() {
        if(this.props.provider != null) {
            let parsedExpiration = parseInt(this.state.expiration)
            if(!isNaN(parsedExpiration)) {
                let expiration = await this.props.provider.getBlockNumber() + parsedExpiration;
                console.log(expiration)
            }
        }

        // let hash = await this.orderFiller.getMessageHash(await this.startsWithToken1.getAddress(), this.token1Supply.toString(), this.token0Supply.toString(), false, expiration, 0);

        // await this.token0.connect(this.startsWithToken0).approve(this.orderFiller.address, this.token0Supply.toString());
        // await this.token1.connect(this.startsWithToken1).approve(this.orderFiller.address, this.token1Supply.toString());

        // let signedHash = ethers.utils.arrayify(await this.startsWithToken0.signMessage(ethers.utils.arrayify(hash)));
    }

    render() {
        return (
            <div>
                <h2>Sign a limit order:</h2>
                <LabeledTextInput value={this.state.expiration} onInput={text => {
                    this.setState({expiration: text}, this.trySigning)
                }}>How many blocks until this order expires?</LabeledTextInput>
                <LabeledTextInput value={this.state.to} onInput={text => {
                    this.setState({to: text}, this.trySigning)
                }}>What address do you want to trade with?</LabeledTextInput>
            </div>
        );
    }
}
