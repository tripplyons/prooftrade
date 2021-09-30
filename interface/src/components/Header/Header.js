import React from 'react';
import './Header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <h1 className="Header">prooftrade</h1>
        );
    }
}
