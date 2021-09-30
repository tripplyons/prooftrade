import React from 'react';
import TextInput from '../TextInput/TextInput';
import AlignedText from '../AlignedText/AlignedText';
import './LabeledTextInput.css';

export default class LabeledTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.value = "";
    }

    render() {
        return (
            <div className="LabeledTextInput--container">
                <div className="LabeledTextInput--column">
                    <AlignedText>
                        {this.props.children}
                    </AlignedText>
                </div>
                <div className="LabeledTextInput--column">
                    <TextInput onInput={this.props.onInput} value={this.props.value}>

                    </TextInput>
                </div>
            </div>
        );
    }
}