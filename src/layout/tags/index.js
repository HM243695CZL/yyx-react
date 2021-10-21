import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import Tags from './Tag'
class TagsComponent extends Component{
    render() {
        const {theme, collapsed} = this.props;
        const classnames = cx('tags-container', {
            'fixedTags': theme.layout.includes('fixedHeader'),
            'collapsed': collapsed
        });
        return (
            <div className={classnames}>
                <Tags />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collapsed: state.UI.collapsed
});

export default connect(mapStateToProps, null)(TagsComponent)
