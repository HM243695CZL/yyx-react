import React, {Component} from 'react';
import {connect} from 'react-redux';

class FormComponent extends Component{
    render() {
        return (
            <div className='form-container'>
                form
            </div>
        )
    }
}

export default connect(null, null)(FormComponent);
