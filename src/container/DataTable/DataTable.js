import React, { Component } from 'react';
// component
import DataTableHeader from '../../component/DataTableHeader/DataTableHeader';
import Button from '../../component/Button/Button';
import DataColumn from '../../component/DataColumn/DataColumn';
// scss 
import './DataTable.scss';
//redux
import { connect } from 'react-redux';

class DataTable extends Component {
    getDataView = () => {
        return this.props.data.map((dataInfo,i)=>{
            return <DataColumn id={i+1} name={dataInfo.name} phone={dataInfo.phone} email={dataInfo.email} openForm={this.props.openForm}/>
        })
    }
    render() {
        return (
            <div className="datatable-container">
              <DataTableHeader/>
              <div className="datatable-data">
                {this.getDataView()}
              </div>
              <div className="button-container">
                 <Button styleClass={'datatable-button'} onClick={this.props.openForm} buttonHolder={'Add New Data'}/>
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
export default connect(mapStateToProps)(DataTable);