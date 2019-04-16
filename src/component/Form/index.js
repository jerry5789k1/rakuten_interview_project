import React, { Component } from 'react';
import './index.scss';
import InputField from '../../component/InputField';
import EmailInput from '../../component/EmailInput';
import Button from '../../component/Button';

class Form extends Component {
    state = {
        name:'',
        isNameExist:false,
        isNameEmpty:false,
        phone:'',
        email:'',
        isEmailEmpty:false,
        isEmailValid:true,
    }
    componentDidMount = () => {
        const { selectedUser } = this.props
        if(selectedUser) {
            this.setState({
                name:selectedUser.name,
                phone:selectedUser.phone,
                email:selectedUser.email,
            })
        }
    }
    checkIsNameExist = (name) => {
        const { userList } = this.props
        const isNameExist = userList.find((info)=> info.name === name)
        if(isNameExist){
            return true
        }else {
            return false
        }
    }
    checkIsNewNameExist = (name,newName) => {
        const { userList } = this.props
        let dataToCheck = userList.slice().filter((user)=>user.name !== name);
        let isNewNameExist = dataToCheck.findIndex((info)=> info.name === newName);
        if(isNewNameExist !== -1){
            return true
        }else {
            return false
        }
    }

    handleNameValue = (value,isEmpty) => {
       let isNameExist = false
       const {selectedUser} = this.props
       if(!selectedUser){
          isNameExist = this.checkIsNameExist(value);
       }else {
          isNameExist = this.checkIsNewNameExist(selectedUser.name, value)
       }
       this.setState({
           name:value,
           isNameEmpty:isEmpty,
           isNameExist,
       })
    }

    handlePhoneValue = (value) => {
        this.setState({
            phone:value,
        })
    }

    handleEmailValue = (value, isEmpty, isValid) => {
        this.setState({
            email:value,
            isEmailEmpty:isEmpty,
            isEmailValid:isValid,
        })
    }
    isValueEmpty = (value) => {
        const isEmpty = value.length > 0 ? false : true;
        return isEmpty;
    }
    isReadyToSubmit = (...args) => {
        return args.every((value)=> value === true);
    }
    
    onSubmit = () => {
       const name = this.state.name
       const phone = this.state.phone
       const email = this.state.email
       const isNameEmpty = !this.isValueEmpty(name);
       const isEmailEmpty = !this.isValueEmpty(email);
       const dataToSubmit = {
           name,
           phone,
           email,
       }
        const { createUserData,updateUserData, closeForm,selectedUser,selectedUserId,userList } = this.props;
       if(selectedUser){ //edit
          const isNewNameExist = !this.checkIsNewNameExist(selectedUser.name,name); 
          const isReadyToEdit = this.isReadyToSubmit(isNameEmpty,isEmailEmpty,isNewNameExist)
          if(isReadyToEdit) {
            const index = userList.findIndex((user)=> user.name === selectedUserId);
            let newData = userList.slice();
            newData[index] = dataToSubmit
            updateUserData(newData)
            closeForm();
          }else {
            this.setState({
                isNameEmpty:!isNameEmpty,
                isEmailEmpty:!isEmailEmpty,
                isNameExist:!isNewNameExist,
            })
          }
       }else { // create
          const isNameExist = !this.checkIsNameExist(name);
          const isReady = this.isReadyToSubmit(isNameEmpty,isEmailEmpty,isNameExist)
          if(isReady){
            createUserData(dataToSubmit)
            closeForm();
          }else {
            this.setState({
                isNameEmpty:!isNameEmpty,
                isEmailEmpty:!isEmailEmpty,
                isNameExist:!isNameExist,
            })
          }      
       }
    }

    componentWillUnmount = () => {
        this.props.resetSelectedUserId();
    }
    render() {
        const {name, isNameEmpty, email, isEmailEmpty, isEmailValid, phone,isNameExist} = this.state
        const { selectedUser } = this.props
        return (
            <div className="form-container">

                <InputField 
                    title={"Name："} 
                    type={"text"} 
                    value={name} 
                    placeHolder={"Your name"} 
                    handleValue={this.handleNameValue} 
                    isEmpty={isNameEmpty}
                    isExist={isNameExist}
                />
                <InputField 
                    title={"Phone："} 
                    type={"text"} 
                    value={phone}
                    placeHolder={"Your Phone Number"} 
                    handleValue={this.handlePhoneValue}
                />
                <EmailInput
                    title={"E-mail："} 
                    type={"text"} 
                    value={email}
                    placeHolder={"Your Email Address"} 
                    handleValue={this.handleEmailValue} 
                    isEmpty={isEmailEmpty}
                    isValid={isEmailValid} 
                />
                <div className="button-container">
                    <Button onClick={this.props.closeForm} buttonHolder={'Cancel'}/>
                    <Button className="button-margin" onClick={this.onSubmit} buttonHolder={`${selectedUser?'Update':'Submit'}`}/>
                </div>
            </div>
        );
    }
}

export default Form;