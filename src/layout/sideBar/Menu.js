import React from 'react';
import {connect} from 'react-redux';
import {Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {addTagList, changeCurrentPath} from '@/store/actions';
import {getMenu} from '@/utils';


const SubMenu = Menu.SubMenu;
const MenuComponent = props => {
    const {history, collapsed, theme} = props;
    // 当前选中的菜单栏
    const menuSelected = history.location.pathname;
    // 当前展开的菜单栏
    const menuOpened = `/${menuSelected.split('/')[1]}`;
    /**
     * 每次点击菜单栏时，判断tagList数组中是否存在当前path，若没有，则push
     * tagList最多存在15个，当>= 15时，删除第一个
     */
    const handleMenuSelect = ({ key }) => {
        const {addTagList, changeCurrentPath, location, match} = props;
        const tabKey = key + location.search;
        addTagList({
            tabKey,
            params: match.params
        });
        // changeCurrentPath(key);
    };
    return (
        <div className='menu-container'>
            <Menu
                defaultOpenKeys={[menuOpened]}
                defaultSelectedKeys={[menuSelected]}
                mode="inline"
                theme={theme}
                onSelect={handleMenuSelect}
            >
                {
                    (JSON.parse(getMenu())|| []).map(ele => {
                        if(ele.children && !ele.hidden) {
                            return (
                                <SubMenu
                                    key={ele.path}
                                    title={
                                        <span>
                                            <i className={ele.icon} />
                                            {
                                                !collapsed && ele.title
                                            }
                                        </span>
                                    }
                                >
                                    {
                                        ele.children.map(subItem =>
                                            <Menu.Item
                                                key={subItem.path}
                                            >
                                                <Link to={subItem.path}>
                                                    <i className={subItem.icon} />{subItem.title}
                                                </Link>
                                            </Menu.Item>
                                        )
                                    }
                                </SubMenu>
                            )
                        } else if(!ele.hidden) {
                            return (
                                <Menu.Item key={ele.path}>
                                    <Link to={ele.path} title={ele.title}>
                                        <i className={ele.icon} />
                                        {
                                            !collapsed && ele.title
                                        }
                                    </Link>
                                </Menu.Item>
                            )
                        }
                    })
                }
            </Menu>
        </div>
    )
};

const mapStateToProps = state => ({
    userInfo: state.user.userInfo,
    tagList: state.UI.tagList,
    collapsed: state.UI.collapsed,
});

const mapDispatchToProps = dispatch => ({
    addTagList: payload => {
        dispatch(addTagList(payload));
    },
    changeCurrentPath: payload => {
        dispatch(changeCurrentPath(payload))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuComponent))
