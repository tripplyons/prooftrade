import React from 'react';
import Button from '../Button/Button';
import AlignedText from '../AlignedText/AlignedText';
import './ConnectToMetaMask.css';

export default class ConnectToMetaMask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectedWallet: null
        };
        this.accountCheckingInterval = null;
    }

    componentDidMount() {
        this.accountCheckingInterval = setInterval(this.checkForAccountChange.bind(this), 250)
    }

    componentWillUnmount() {
        clearInterval(this.accountCheckingInterval)
    }

    checkForAccountChange() {
        if(this.props.provider != null) {
            this.props.provider.listAccounts().then(accounts => {
                if(accounts[0] !== this.state.connectedWallet) {
                    this.setState({
                        connectedWallet: accounts[0]
                    });
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.provider != null && prevProps.provider == null) {
            this.props.provider.listAccounts().then(accounts => {
                this.setState({
                    connectedWallet: accounts[0]
                });
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Connect to MetaMask:</h2>
                <div className="ConnectToMetaMask--container">
                    <div className="ConnectToMetaMask--column">
                        <AlignedText>
                            {this.state.connectedWallet == null ? "No account connected" : this.state.connectedWallet}
                        </AlignedText>
                    </div>
                    <div className="ConnectToMetaMask--column">
                        <Button
                            onClick={this.props.onClick}
                            disabled={this.props.provider != null}
                        >
                            {
                                this.props.provider == null ? "Connect to MetaMask" : "Connected to MetaMask"
                            }
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}