import React, { Component } from 'react';
import './index.scss';
class Button extends Component {
    render() {
        const { buttonHolder,...buttonAttribute } = this.props
        return (
              <button {...buttonAttribute} >{buttonHolder}</button>
        );
    }
}

export default Button;