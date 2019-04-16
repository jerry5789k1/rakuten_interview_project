import React, { Component } from 'react';
import './index.scss';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import {editData,deleteData} from '../../redux/action';


class UserDataColumn extends Component {
    handleEdit = () => {
      const { editData,openForm,name } =this.props
      editData(name);
      openForm();
    }

    handleDelete = () => {
      const {  userList, name, deleteData } = this.props;
      const newData =  userList.filter((info)=> info.name !== name);
      deleteData(newData);
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
const mapStateToProps = (state) => {
    return {
        userList: state.userList
    }
}
export default connect(mapStateToProps,{editData,deleteData})(UserDataColumn);