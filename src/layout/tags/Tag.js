import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addTagList, changeCurrentPath} from '@/store/actions';
import TagList from '@/components/TagList'
import './index.less'

class Tags extends Component{

    componentWillMount() {
        const {addTagList, changeCurrentPath} = this.props;
        const locationCurrentPath = this.props.history.location.pathname;
        addTagList({
            path: locationCurrentPath
        });
        changeCurrentPath(locationCurrentPath)
    }
    render() {
        const {tagList} = this.props;
        return (
            <div className='tags-box'>
                {
                    tagList.map(ele => (
                        <div key={ele.path} className='tag-item'>
                            <TagList
                                path={ele.path}
                                title={ele.title}
                            />
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tagList: state.UI.tagList,
    currentPath: state.UI.currentPath
});

const mapDispatchToProps = dispatch => ({
    addTagList: payload => {
        dispatch(addTagList(payload))
    },
    changeCurrentPath: payload => {
        dispatch(changeCurrentPath(payload))
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tags))
