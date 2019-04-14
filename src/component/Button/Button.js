import React, { Component } from 'react';
// scss
import './Button.scss';
class Button extends Component {
    handleClick = () => {
        this.props.onClick();
    }
    render() {
        const { styleClass, buttonHolder } = this.props
        return (
            <React.Fragment>
              <button className={`${styleClass ? styleClass : null}`} onClick={e => this.handleClick(e)}>{buttonHolder}</button>
            </React.Fragment>
        );
    }
}

export default Button;