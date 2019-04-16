import React, { Component } from 'react';
import './InputField.scss';

class InputField extends Component {
    handleChange = (e) => {
      const value = e.target.value;
      const isEmpty = value.length > 0 ? false : true;
      this.props.handleValue(value,isEmpty);
    }
    getWarningInfo = (isEmpty, isExist) => {
        if(isEmpty){
            return <div className="warning">This field can not be empty</div>
        }else {
            if(isExist !== undefined){
                return isExist === true ? <div className="warning">The name is already exist</div>: null
            }
            return null
        }
    }
    render() {
        const { value,type,title,placeHolder,isEmpty,isExist } = this.props
       
        return (
            <div className="inputfield-container">
                <div className="title-and-input">
                    <div className="title">{title ? title : null}</div>
                    <input type={type} value={value} placeholder={placeHolder ? placeHolder : null}  onChange={e => this.handleChange(e)}/>
                </div>
                {this.getWarningInfo(isEmpty,isExist)}
            </div>
        );
    }
}

export default InputField;