import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, Button} from 'antd';

class Error extends Component{
    render() {
        return (
            <div className='error-container'>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </div>
        )
    }

}
export default connect(null, null)(Error);
