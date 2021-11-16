import React, {Component} from 'react';
import {connect} from 'react-redux';


function TableInfoComponent(props) {
    return(
        <div className='table-info-container'>
            table-info-container 【params】-{JSON.stringify(props.location.params)}
            <input type="text"/>
        </div>
    )
}

export default connect(null, null)(TableInfoComponent);
