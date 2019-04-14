import React, { Component } from 'react';
import './EmailInput.scss';

class EmailInput extends Component {
      handleChange = (e) => {
        let value = e.target.value;
        let isEmpty = value.length > 0 ? false : true;
        const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        let isValid = emailRule.test(value);
        this.props.handleValue(value,isEmpty,isValid);
      }
      getWarningInfo = (isEmpty,isValid) => {
          if(isEmpty){
            return (<div className="warning">This field can not be empty</div>)
          }else {
             if(!isValid){
                return (<div className="warning">Please check your email format</div>)
             }else {
                return null; 
             }
          }
      }
      render() {
          const { value,type,title,placeHolder,isEmpty,isValid} = this.props
         
          return (
              <div className="inputfield-container">
                  <div className="title-and-input">
                      <div className="title">{title ? title : null}</div>
                      <input type={type} value={value} placeholder={placeHolder ? placeHolder : null}  onChange={e => this.handleChange(e)}/>
                  </div>
                  {this.getWarningInfo(isEmpty,isValid)}
              </div>
          );
      }
}

export default EmailInput;