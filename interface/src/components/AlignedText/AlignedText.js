import React from 'react';
import './AlignedText.css';

export default class AlignedText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="AlignedText">
                {this.props.children}
            </div>
        );
    }
}
