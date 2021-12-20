import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {
    GithubOutlined
} from '@ant-design/icons';
import cx from 'classnames';
import Menu from './Menu'
import './index.less';

const {Sider} = Layout;

class SideBarComponent extends Component{
    render() {
        const {collapsed, theme} = this.props;
        const classnames = cx('logo', 'bg-' + theme.navbar);
        const sideBarClass = cx('sidebar-left', 'side-' + theme.leftSide);
        return (
            <div className='side-container'>
                <Sider
                    width={collapsed ? 80 : 250}
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                    className={sideBarClass}
                >
                    <div className={classnames}>
                        <GithubOutlined />
                        {
                            !collapsed && <span className='txt'>hm243695czl</span>
                        }
                    </div>
                    <Menu theme={theme.leftSide}  />
                </Sider>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    collapsed: state.UI.collapsed,
    isMobile: state.UI.isMobile
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent)
