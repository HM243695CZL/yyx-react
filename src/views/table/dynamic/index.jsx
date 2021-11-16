import React, {Component} from 'react';
import {connect} from 'react-redux';


function TableDynamicComponent(props) {
    return(
        <div className='table-dynamic-container'>
            table-dynamic-container 【params】-{JSON.stringify(props.location.params)}
            <br/>
            <input type="text"/>
        </div>
    )
}

export default connect(null, null)(TableDynamicComponent);
