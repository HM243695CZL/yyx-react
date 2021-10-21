import React, {Component} from 'react';
import {connect} from 'react-redux';

class TestComponent extends Component{
    constructor(props, ...args) {
        super(props, ...args);
        props.cacheLifecycles.didCache(this.componentDidCache);
        props.cacheLifecycles.didRecover(this.componentDidRecover);
    }
    state = {
        count: 1
    };
    componentDidCache = () => {
        console.log('test cached');
    };
    componentDidRecover = () => {
        console.log('test recovered')
    };
    add(){
        this.setState({
            count: 5
        })
    }

    render() {
        return(
            <div className='test-container'>
                count: {this.state.count}
                <button onClick={e => this.add()}>add</button>
                test
            </div>
        )
    }
}

export default connect(null, null)(TestComponent);
