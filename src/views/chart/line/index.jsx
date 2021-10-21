import React, {Component} from 'react';
import {connect} from 'react-redux';

class Line extends Component{
    render() {
        return (
            <div className='line-container'>
                line-container
            </div>
        )
    }

}
export default connect(null, null)(Line);
