import React, { Component } from 'react';
import './Form.scss';
import InputField from '../../component/InputField/InputField';
import EmailInput from '../../component/EmailInput/EmailInput';
import Button from '../../component/Button/Button';
import { connect } from 'react-redux';
import {createData, resetIdToEdit, updateData} from '../../redux/action'

class Form extends Component {
    state = {
        name:'',
        isNameExist:false,
        nameIsEmpty:false,
        phone:'',
        email:'',
        emailIsEmpty:false,
        emailIsValid:true,
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
        const isNameExist = userList.find((info)=> info.name === name)
        if(isNameExist){
            return true
        }else {
            return false
        }
    }
    isNewNameExist = (name,newName) => {
        const { userList } = this.props
        let dataToCheck = userList.slice().filter((user)=>user.name !== name);
        let isNewNameExist = dataToCheck.findIndex((info)=> info.name === newName);
        console.log("dataToCheck", isNewNameExist,dataToCheck);
        if(isNewNameExist !== -1){
            return true
        }else {
            return false
        }
    }
    handleName = (value,isEmpty) => {
       let isNameExist = false
       const {selectedUser} = this.props
       if(!selectedUser){
          isNameExist = this.checkNameExist(value);
       }else {
          isNameExist = this.isNewNameExist(selectedUser.name, value)
       }
       this.setState({
           name:value,
           nameIsEmpty:isEmpty,
           isNameExist,
       })
    }

    handlePhone = (value) => {
        this.setState({
            phone:value,
        })
    }

    handleEmail = (value, isEmpty, isValid) => {
        this.setState({
            email:value,
            emailIsEmpty:isEmpty,
            emailIsValid:isValid,
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
       const nameIsEmpty = !this.isValueEmpty(name);
       const emailIsEmpty = !this.isValueEmpty(email);
       const dataToSubmit = {
           name,
           phone,
           email,
       }
        const { createData,updateData, closeForm,selectedUser,selectedUserId,userList } = this.props;
       if(selectedUser){ //edit
          const isNewNameExist = !this.isNewNameExist(selectedUser.name,name); 
          const isReadyToEdit = this.isReadyToSubmit(nameIsEmpty,emailIsEmpty,isNewNameExist)
          if(isReadyToEdit) {
            const index = userList.findIndex((user)=> user.name === selectedUserId);
            let newData = userList.slice();
            newData[index] = dataToSubmit
            updateData(newData)
            closeForm();
          }else {
            this.setState({
                nameIsEmpty:!nameIsEmpty,
                emailIsEmpty:!emailIsEmpty,
                isNameExist:!isNewNameExist,
            })
          }
       }else { // create
          const isNameExist = !this.checkNameExist(name);
          const isReady = this.isReadyToSubmit(nameIsEmpty,emailIsEmpty,isNameExist)
          if(isReady){
            createData(dataToSubmit)
            closeForm();
          }else {
            this.setState({
                nameIsEmpty:!nameIsEmpty,
                emailIsEmpty:!emailIsEmpty,
                isNameExist:!isNameExist,
            })
          }      
       }
       
    }

    componentWillUnmount = () => {
        this.props.resetIdToEdit();
    }
    render() {
        const {name, nameIsEmpty, email, emailIsEmpty, emailIsValid, phone,isNameExist} = this.state
        const { selectedUser } = this.props
        return (
            <div className="form-container">

                <InputField 
                    title={"Name："} 
                    type={"text"} 
                    value={name} 
                    placeHolder={"Your name"} 
                    handleValue={this.handleName} 
                    isEmpty={nameIsEmpty}
                    isExist={isNameExist}
                />
                <InputField 
                    title={"Phone："} 
                    type={"text"} 
                    value={phone}
                    placeHolder={"Your Phone Number"} 
                    handleValue={this.handlePhone}
                />
                <EmailInput
                    title={"E-mail："} 
                    type={"text"} 
                    value={email}
                    placeHolder={"Your Email Address"} 
                    handleValue={this.handleEmail} 
                    isEmpty={emailIsEmpty}
                    isValid={emailIsValid} 
                />
                <div className="button-container">
                    <Button onClick={this.props.closeForm} buttonHolder={'Cancel'}/>
                    <Button className="button-margin" onClick={this.onSubmit} buttonHolder={`${selectedUser?'Update':'Submit'}`}/>
                </div>
            </div>
        );
    }
}

const getSelectedUser = (state) => state.userList.find((user)=> user.name === state.selectedUserId)
const mapStateToProps = (state) => {
    return {
      selectedUser: getSelectedUser(state),
      selectedUserId:state.selectedUserId,
      userList:state.userList,
    }
}

export default connect(mapStateToProps,{createData, resetIdToEdit, updateData})(Form);