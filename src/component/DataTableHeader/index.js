import React from 'react';
import './index.scss';
const DataTableHeader = ({toggleSorting,sorting}) => {
    const getSortingIcon = () => {
        switch(sorting){
            case'desc':
                return '▲'
            case'asc':
                return '▼'
        }
    }
    return (
        <div className="datatable-header">
                <div className="cell">No.</div>
                <div className="cell hover-effect" onClick={e=>toggleSorting(e)}>
                    Name {getSortingIcon()}
                </div>
                <div className="cell">Phone</div>
                <div className="email-cell">Email</div>
                <div className="cell">Action</div>
        </div>
    );
};

export default DataTableHeader;