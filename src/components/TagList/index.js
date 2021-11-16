import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Tag, Menu, Dropdown} from 'antd';
import classNames from 'classnames';
import {addTagList, cutTagList, emptyTagList, cutOtherTagList, changeCurrentPath} from '@/store/actions';
import {getCachingKeys, dropByCacheKey, clearCache} from 'react-router-cache-route';
const TagList = props => {
    const {
        path, title, currentPath, history, tagList,
        cutTagList, addTagList, emptyTagList, cutOtherTagList,
        changeCurrentPath
    } = props;
    const closeTag = (path, e) => {
        e.preventDefault();
        turnPath(path);
    };

    const closeThisTag = path => {
        turnPath(path);
    };

    const closeAllTag = () => {
        // 清除所有缓存
        clearCache();
        emptyTagList();
        history.push('/dashboard');
        addTagList({
            path: '/dashboard'
        });
        changeCurrentPath('/dashboard')
    };

    const closeOtherTag = path => {
        // 清除所有缓存
        clearCache();
        if(currentPath !== path) {
            // 说明需要选中其他标签，并关闭另外的标签
            history.push(path);
        }
        cutOtherTagList(path);
        changeCurrentPath(path)
    };
    const turnPath = path => {
        if(getCachingKeys().includes(path)) {
            dropByCacheKey(path);
        }
        const length = tagList.length;
        // 如果关闭的是当前页，则跳转到最后一个标签
        if(path === currentPath) {
            history.push(tagList[length - 1].path);
            changeCurrentPath(tagList[length - 1].path);
        }
        // 如果关闭的是最后的标签，并且当前页也是最后一个，则路由跳转
        if(path === tagList[length - 1].path && currentPath === path) {
            // 关闭标签在最后执行，所以跳转到上一个应该是length - 2
            if(length - 2 > 0) {
                history.push(tagList[length - 2].path);
                changeCurrentPath(tagList[length - 2].path);
            } else if(length === 2) {
                history.push(tagList[0].path);
                changeCurrentPath(tagList[length - 2].path);
            }
        }
        // 关闭最后一个后，跳转到首页
        if(length === 1) {
            history.push('/dashboard');
            addTagList({
                path: '/dashboard'
            });
            changeCurrentPath('/dashboard');
        }
        // 先跳转路由，再修改state中的数据
        cutTagList(path);
    };
    const menu = (
        <Menu>
            {
                path !== '/dashboard' && <Menu.Item key="1" onClick={e => closeThisTag(path)}>关闭当前</Menu.Item>
            }
            <Menu.Item key="2" onClick={e => closeOtherTag(path)}>关闭其他</Menu.Item>
            <Menu.Item key="3" onClick={e => closeAllTag()}>关闭全部</Menu.Item>
        </Menu>
    );
    const chooseTag = path => {
        if(currentPath === path) return false;
        history.push(path);
        changeCurrentPath(path);
    };
    return (
        <Dropdown overlay={menu} trigger={['contextMenu']}>
            <Tag
                className={classNames({'active' : currentPath === path})}
                closable={path !== '/dashboard'}
                onClose={e => closeTag(path, e)}
                onClick={e => chooseTag(path, e)}
            >{title}</Tag>
        </Dropdown>
    )
};

const mapStateToProps = state => ({
    tagList: state.UI.tagList,
    currentPath: state.UI.currentPath
});

const mapDispatchToProps = dispatch => ({
    cutTagList: payload => {
        dispatch(cutTagList(payload))
    },
    addTagList: payload => {
        dispatch(addTagList(payload))
    },
    emptyTagList: () => {
        dispatch(emptyTagList());
    },
    cutOtherTagList: payload => {
        dispatch(cutOtherTagList(payload));
    },
    changeCurrentPath: payload => {
        dispatch(changeCurrentPath(payload))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagList))
