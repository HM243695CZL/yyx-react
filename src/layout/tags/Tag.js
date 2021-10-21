import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addTagList} from '@/store/actions';
import TagList from '@/components/TagList'
import './index.less'

class Tags extends Component{

    componentWillMount() {
        const {addTagList} = this.props;
        const currentPath = this.props.history.location.pathname;
        addTagList({
            path: currentPath
        });
    }
    render() {
        const {tagList} = this.props;
        const currentPath = this.props.history.location.pathname;
        return (
            <div className='tags-box'>
                {
                    tagList.map(ele => (
                        <div key={ele.path} className='tag-item'>
                            <TagList
                                path={ele.path}
                                title={ele.title}
                                currentPath={currentPath}
                            />
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tagList: state.UI.tagList
});

const mapDispatchToProps = dispatch => ({
    addTagList: payload => {
        dispatch(addTagList(payload))
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tags))
