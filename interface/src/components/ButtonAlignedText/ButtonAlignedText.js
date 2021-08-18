import React from 'react';
import './ButtonAlignedText.css';

export default class ButtonAlignedText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="ButtonAlignedText">
                {this.props.children}
            </div>
        );
    }
}