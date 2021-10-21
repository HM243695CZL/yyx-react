import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Menu, Dropdown} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, CaretDownOutlined} from '@ant-design/icons';
import cx from 'classnames';
import {changeCollapsed} from '@/store/actions';
import avatarImg from '@/assets/img/avatar.gif'
import './index.less';
class HeaderComponent extends Component{
    clickCollapsed = () => {
        const {changeCollapsed, collapsed} = this.props;
        changeCollapsed(!collapsed);
    };
    logout = () => {
        const {history} = this.props;
        history.push('/login');
    };
    render() {
        const {collapsed, theme} = this.props;
        const classnames = cx('header-container', 'bg-' + theme.navbar, {
            'fixedHeader': theme.layout.includes('fixedHeader'),
            'collapsed': collapsed
        });
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <span onClick={this.logout}>退出登录</span>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );
        return (
            <div className={classnames}>
                <div className="left-box">
                    <span
                        className='hamburger-container'
                        onClick={this.clickCollapsed}
                    >
                    {
                        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                </span>
                </div>
                <div className="right-menu">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link">
                            <img src={avatarImg} alt=""/>
                            <CaretDownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collapsed: state.UI.collapsed,
    isMobile: state.UI.isMobile,
    userInfo: state.user.userInfo
});

const mapDispatchToProps = dispatch => ({
    changeCollapsed: payload => {
        dispatch(changeCollapsed(payload))
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent))
