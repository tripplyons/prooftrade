import React from 'react';
import './TextInput.css';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <input className="TextInput" type="text" onInput={e => this.props.onInput(e.target.value)} value={this.props.value} />
        )
    }
}
