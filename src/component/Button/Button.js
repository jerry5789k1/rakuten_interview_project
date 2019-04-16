import React, { Component } from 'react';
import './Button.scss';
class Button extends Component {
    handleClick = () => {
        this.props.onClick();
    }
    render() {
        const { buttonHolder,...buttonAttribute } = this.props
        return (
              <button {...buttonAttribute} >{buttonHolder}</button>
        );
    }
}

export default Button;