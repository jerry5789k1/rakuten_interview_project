import React, { Component } from 'react';
import './index.scss';
import InputField from '../../component/InputField';
import EmailInput from '../../component/EmailInput';
import Button from '../../component/Button';

class Form extends Component {
    state = {
        name:'',
        nameExist:false,
        nameEmpty:false,
        phone:'',
        email:'',
        emailEmpty:false,
        emailValid:true,
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
    checkNameExist = (name) => {
        const { userList } = this.props
        const nameExist = userList.find((info)=> info.name === name)
        if(nameExist){
            return true
        }else {
            return false
        }
    }
    checkNewNameExist = (name,newName) => {
        const { userList } = this.props
        let dataToCheck = userList.slice().filter((user)=>user.name !== name);
        let newNameExist = dataToCheck.findIndex((info)=> info.name === newName);
        if(newNameExist !== -1){
            return true
        }else {
            return false
        }
    }

    handleNameValue = (value,isEmpty) => {
       let nameExist = false
       const {selectedUser} = this.props
       if(!selectedUser){
          nameExist = this.checkNameExist(value);
       }else {
          nameExist = this.checkNewNameExist(selectedUser.name, value)
       }
       this.setState({
           name:value,
           nameEmpty:isEmpty,
           nameExist,
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
            emailEmpty:isEmpty,
            emailValid:isValid,
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
       const nameEmpty = !this.isValueEmpty(name);
       const emailEmpty = !this.isValueEmpty(email);
       const dataToSubmit = {
           name,
           phone,
           email,
       }
        const { createUserData,updateUserData, closeForm,selectedUser,selectedUserId,userList } = this.props;
       if(selectedUser){ //edit
          const newNameExist = !this.checkNewNameExist(selectedUser.name,name); 
          const isReadyToEdit = this.isReadyToSubmit(nameEmpty,emailEmpty,newNameExist)
          if(isReadyToEdit) {
            const index = userList.findIndex((user)=> user.name === selectedUserId);
            let newData = userList.slice();
            newData[index] = dataToSubmit
            updateUserData(newData)
            closeForm();
          }else {
            this.setState({
                nameEmpty:!nameEmpty,
                emailEmpty:!emailEmpty,
                nameExist:!newNameExist,
            })
          }
       }else { // create
          const nameExist = !this.checkNameExist(name);
          const isReady = this.isReadyToSubmit(nameEmpty,emailEmpty,nameExist)
          if(isReady){
            createUserData(dataToSubmit)
            closeForm();
          }else {
            this.setState({
                nameEmpty:!nameEmpty,
                emailEmpty:!emailEmpty,
                nameExist:!nameExist,
            })
          }      
       }
    }

    componentWillUnmount = () => {
        this.props.resetSelectedUserId();
    }
    render() {
        const {name, nameEmpty, email, emailEmpty, emailValid, phone,nameExist} = this.state
        const { selectedUser } = this.props
        return (
            <div className="form-container">

                <InputField 
                    title={"Name："} 
                    type={"text"} 
                    value={name} 
                    placeHolder={"Your name"} 
                    handleValue={this.handleNameValue} 
                    isEmpty={nameEmpty}
                    isExist={nameExist}
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
                    isEmpty={emailEmpty}
                    isValid={emailValid} 
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