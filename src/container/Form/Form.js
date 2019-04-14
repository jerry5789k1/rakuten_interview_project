import React, { Component } from 'react';
// scss
import './Form.scss';
// component
import InputField from '../../component/InputField/InputField';
import EmailInput from '../../component/EmailInput/EmailInput';
import Button from '../../component/Button/Button';
//redux 
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
        dataToEdit:undefined,
    }
    componentDidMount = () => {
        let dataToEdit = this.props.data.find((info)=> info.name === this.props.dataToEdit.idToEdit);
        if(dataToEdit) {
            this.setState({
                name:dataToEdit.name,
                phone:dataToEdit.phone,
                email:dataToEdit.email,
                dataToEdit,
            })
        }
    }
    checkNameExist = (name) => {
        const isNameExist = this.props.data.find((info)=> info.name === name)
        if(isNameExist){
            return true
        }else {
            return false
        }
    }
    isNewNameExist = (name,newName) => {
        let dataToCheck = this.props.data.slice().filter((info)=>info.name !== name);
        let isNewNameExist = dataToCheck.findIndex((info)=> info.name === newName);
        if(isNewNameExist !== -1){
            return true
        }else {
            return false
        }
    }
    handleName = (value,isEmpty) => {
       let isNameExist = false
       const {dataToEdit} = this.state
       if(!dataToEdit){
          isNameExist = this.checkNameExist(value);
       }else {
          isNameExist = this.isNewNameExist(dataToEdit.name, value)
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

    handleEmail = (value, isEmpty,isValid) => {
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
       let name = this.state.name
       let phone = this.state.phone
       let email = this.state.email
       let nameIsEmpty = !this.isValueEmpty(name);
       let emailIsEmpty = !this.isValueEmpty(email);
       let dataToSubmit = {
                           name: name,
                           phone: phone,
                           email: email,
                          }
       if(this.state.dataToEdit){ //edit
          let isNewNameExist = !this.isNewNameExist(this.state.dataToEdit.name,name); 
          let isReadyToEdit = this.isReadyToSubmit(nameIsEmpty,emailIsEmpty,isNewNameExist)
          if(isReadyToEdit) {
            let index = this.props.data.findIndex((info)=> info.name === this.props.dataToEdit.idToEdit);
            let newData = this.props.data.slice();
            newData[index] = dataToSubmit
            this.props.dispatch(updateData(newData))
            this.props.closeForm();
          }else {
            this.setState({
                nameIsEmpty:!nameIsEmpty,
                emailIsEmpty:!emailIsEmpty,
                isNameExist:!isNewNameExist,
            })
          }
       }else { // create
          let isNameExist = !this.checkNameExist(name);
          let isReady = this.isReadyToSubmit(nameIsEmpty,emailIsEmpty,isNameExist)
          if(isReady){
            this.props.dispatch(createData(dataToSubmit))
            this.props.closeForm();
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
        this.props.dispatch(resetIdToEdit());
    }
    render() {
        const {name, nameIsEmpty, email, emailIsEmpty, emailIsValid, phone,isNameExist} = this.state
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
                    <Button styleClass={"button-margin"} onClick={this.onSubmit} buttonHolder={`${this.state.dataToEdit?'Update':'Submit'}`}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state[0],
        dataToEdit:state[1],
    }
}

export default connect(mapStateToProps)(Form);