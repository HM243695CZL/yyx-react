import React, {Component} from 'react';
import {connect} from 'react-redux';

class MapComponent extends Component{
    state = {
        count: 0
    }
    add() {
        this.setState({
            count: 3
        })
    }
    render() {
        return (
            <div className='map-container'>
                count: {this.state.count}
                <button onClick={e => this.add()}>add</button>
            </div>
        )
    }
}

export default connect(null, null)(MapComponent);
