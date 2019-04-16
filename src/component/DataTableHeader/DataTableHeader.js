import React from 'react';
import './DataTableHeader.scss';
const DataTableHeader = () => {
    return (
        <div className="datatable-header">
                <div className="cell">No.</div>
                <div className="cell">Name</div>
                <div className="cell">Phone</div>
                <div className="email-cell">Email</div>
                <div className="cell">Action</div>
        </div>
    );
};

export default DataTableHeader;