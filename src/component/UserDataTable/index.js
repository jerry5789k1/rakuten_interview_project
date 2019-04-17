import React, { Component } from 'react';
import DataTableHeader from '../../component/DataTableHeader';
import Button from '../../component/Button';
import UserDataColumn from '../../container/UserDataColumn';
import './index.scss';

class UserDataTable extends Component {
    state={
        sorting: 'asc',
    }
    getDataView = (userList) => {
        const { openForm } = this.props
        return userList.map((user,i)=>{
            return <UserDataColumn key={user.name} id={i+1} name={user.name} phone={user.phone} email={user.email} openForm={openForm}/>
        })
    }
    sortUserList = (sortType) => {
        const { userList } = this.props
        switch(sortType){
            case'desc':
                return  userList.sort((a,b)=>{
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    return nameA > nameB ? -1 : 1
                });
            default:
                return userList.sort((a,b)=>{
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    return nameA > nameB ? 1 : -1
                });
        }
    }
    toggleSorting = () => {
        const { sorting } = this.state
        if(sorting === 'asc'){
            this.setState({
                sorting:"desc",
            })
        }else {
            this.setState({
                sorting:"asc",
            })
        }
    }
    render() {
        const {openForm} = this.props
        const { sorting } = this.state
        const userListToRender = this.sortUserList(sorting)
        return (
            <div className="datatable-container">
              <DataTableHeader toggleSorting={this.toggleSorting} sorting={sorting} />
              <div className="datatable-data">
                {this.getDataView(userListToRender)}
              </div>
              <div className="button-container">
                 <Button className="datatable-button" onClick={openForm} buttonHolder={'Add New Data'}/>
              </div>  
            </div>
        );
    }
}

export default UserDataTable