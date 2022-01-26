import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { addTagList, cutTagList, changeCurrentPath, cutOtherTagList, emptyTagList } from '@/store/actions';
import {getTabsComponent} from '../tabsConfig';
import cx from 'classnames';
import {Tabs} from 'antd';
const { TabPane } = Tabs;


const AppMain = props => {
    const { tagList, addTagList, currentPath, changeCurrentPath, cutOtherTagList, emptyTagList, cutTagList } = props;
    const [visible, setVisible] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [selectedTag, setSelectedTag] = useState({});
    const openMenu = (data, e) =>{
        e.preventDefault();
        setSelectedTag(data.tag);
        setVisible(true);
        setLeft(e.clientX);
        setTop(e.clientY);
    };
    const closeMenu = () => {
      setVisible(false);
    };
    const MyTab = tag => {
        return (
            <span onContextMenu={e => openMenu(tag, e)}>{tag.title}</span>
        )
    };
    const contextMenuClass = cx({
        'context-menu': true,
        'show': visible
    });
    const changeTab = activeKey => {
        if (currentPath === activeKey) return false;
        props.history.push(activeKey);
        addTagList({
            tabKey: activeKey
        })
    };
    const closeThisTab = () => {
        removeTab(selectedTag.tabKey)
    };
    const closeOtherTab = () => {
        cutOtherTagList({
            tabKey: selectedTag.tabKey
        });
        if (currentPath !== selectedTag.tabKey) {
            props.history.push(selectedTag.tabKey)
        }
        changeCurrentPath({
            tabKey: selectedTag.tabKey
        })
    };
    const closeAllTab = () => {
        emptyTagList();
        addTagList({
            tabKey: '/dashboard'
        });
        changeCurrentPath({
            tabKey: '/dashboard'
        })
    };
    const removeTab = tabKey => {
        const length = tagList.length;
        // 如果关闭的是当前标签，则跳转到最后一个标签
        if (currentPath === tabKey) {
            props.history.push(tagList[length - 1].tabKey);
            changeCurrentPath({
                tabKey: tagList[length - 1].tabKey
            })
        }
        // 如果关闭的是最后一个标签，并且当前标签也是最后一个，则路由跳转
        if (tabKey === tagList[length - 1].tabKey && currentPath === tabKey) {
            // 关闭最后一个标签，跳转到首页
            if (length === 1) {
                props.history.push('/dashboard');
                changeCurrentPath({
                    tabKey: '/dashboard'
                });
                addTagList({
                    tabKey: '/dashboard',
                    title: '首页'
                })
            } else {
                props.history.push(tagList[length - 2].tabKey);
                changeCurrentPath({
                    tabKey: tagList[length - 2].tabKey
                })
            }
        }
        cutTagList({
            tabKey
        })
    };
    useEffect(() => {
        if (visible) {
            document.body.addEventListener('click', closeMenu);
        } else {
            document.body.removeEventListener('click', closeMenu);
        }
    }, [visible]);
    useEffect(() => {
        const locationCurrentPath = props.history.location.pathname + props.history.location.search;
        let titleObj = {};
        if (locationCurrentPath.indexOf('add-goods-info') > -1) {
            titleObj.title = '新增商品';
        }
        if (locationCurrentPath.indexOf('goods-id') > -1) {
            titleObj.title = '修改商品';
        }
        addTagList({
            ...titleObj,
            tabKey: locationCurrentPath,
        })
    }, []);
    return (
        <>
            <Tabs
                hideAdd
                type={(currentPath === '/dashboard' && tagList.length === 1) ? 'card' : 'editable-card'}
                activeKey={currentPath}
                onChange={changeTab}
                onEdit={removeTab}
            >
                {
                    tagList.map(item => (
                        <TabPane tab={<MyTab title={item.title || '标题'} tag={item} />} key={item.tabKey}>
                            {
                                getTabsComponent(item.tabKey).component
                            }
                        </TabPane>
                    ))
                }
            </Tabs>
            <ul className={contextMenuClass}
                style={{
                    left: left + 'px',
                    top: top + 'px'
                }}
            >
                {
                    currentPath !== '/dashboard' && <li onClick={closeThisTab}>关闭</li>
                }
                <li onClick={closeOtherTab}>关闭其他</li>
                <li onClick={closeAllTab}>关闭全部</li>
            </ul>
        </>
    )
};
const mapStateToProps = state => ({
    collapsed: state.UI.collapsed,
    isMobile: state.UI.isMobile,
    tagList: state.UI.tagList,
    currentPath: state.UI.currentPath
});
const mapDispatchToProps = dispatch => ({
    addTagList: payload => {
        dispatch(addTagList(payload))
    },
    cutTagList: payload => {
        dispatch(cutTagList(payload))
    },
    cutOtherTagList: payload => {
      dispatch(cutOtherTagList(payload))
    },
    emptyTagList: () => {
        dispatch(emptyTagList())
    },
    changeCurrentPath: payload => {
        dispatch(changeCurrentPath(payload))
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMain))
