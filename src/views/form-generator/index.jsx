import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
class FormGeneratorComponent extends Component{
    render() {
        return (
            <div className='form-generator-container'>
                <div className="left-board">
                    left-board
                </div>
                <div className="center-board">
                    center-board
                </div>
                <div className="right-board">
                    right-board
                </div>
            </div>
        )
    }
}

export default connect(null, null)(FormGeneratorComponent);
