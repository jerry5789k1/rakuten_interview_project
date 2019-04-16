import React, { Component } from 'react';
import DataTableHeader from '../../component/DataTableHeader/DataTableHeader';
import Button from '../../component/Button/Button';
import UserDataColumn from '../../component/UserDataColumn';
import './index.scss';
import { connect } from 'react-redux';

class UserDataTable extends Component {
    getDataView = () => {
        const { userList,openForm } = this.props
        return userList.map((user,i)=>{
            return <UserDataColumn key={user.name} id={i+1} name={user.name} phone={user.phone} email={user.email} openForm={openForm}/>
        })
    }
    render() {
        const {openForm} = this.props
        return (
            <div className="datatable-container">
              <DataTableHeader/>
              <div className="datatable-data">
                {this.getDataView()}
              </div>
              <div className="button-container">
                 <Button className="datatable-button" onClick={openForm} buttonHolder={'Add New Data'}/>
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
export default connect(mapStateToProps)(UserDataTable);