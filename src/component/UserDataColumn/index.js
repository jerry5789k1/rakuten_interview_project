import React, { Component } from 'react';
import './index.scss';
import Button from '../Button';


class UserDataColumn extends Component {
    handleEdit = () => {
      const { editUserData,openForm,name } =this.props
      editUserData(name);
      openForm();
    }
    handleDelete = () => {
      const {  userList, name, deleteUserData } = this.props;
      const newData =  userList.filter((info)=> info.name !== name);
      deleteUserData(newData);
    }
    render() {
        const {id, name, phone, email} = this.props;
        return (
            <div className="datacolumn">
                <div className="data-cell center">{id}</div>
                <div className="data-cell">{name}</div>
                <div className="data-cell">{phone}</div>
                <div className="email-data-cell">{email}</div>
                <div className="data-cell">
                    <Button className="datacell-button" buttonHolder="edit" onClick={this.handleEdit}/>
                    <Button className="datacell-button margin" buttonHolder="delete" onClick={this.handleDelete}/>
                </div>
            </div>
        );
    }
}
export default UserDataColumn