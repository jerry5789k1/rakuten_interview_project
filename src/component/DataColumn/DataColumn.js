import React, { Component } from 'react';
// scss
import './DataColumn.scss';
// component
import Button from '../../component/Button/Button';
//redux 
import { connect } from 'react-redux';
import {editData,deleteData} from '../../redux//action';


class DataColumn extends Component {
    handleEdit = () => {
      this.props.dispatch(editData(this.props.name));
      this.props.openForm();
    }

    handleDelete = () => {
      const { data, name} = this.props
      const newData = data.filter((info)=> info.name !== name);
      this.props.dispatch(deleteData(newData));
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
                    <Button styleClass={'datacell-button'} buttonHolder={'edit'} onClick={this.handleEdit}/>
                    <Button styleClass={'datacell-button margin'} buttonHolder={'delete'} onClick={this.handleDelete}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        data: state[0]
    }
}
export default connect(mapStateToProps)(DataColumn);