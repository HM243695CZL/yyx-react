import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SettingOutlined} from '@ant-design/icons';
import {Tabs} from 'antd';
import cx from 'classnames';
import NavBarBox from './NavBarBox';
import SideBarBox from './SideBarBox';
import LayoutBox from './LayoutBox';
import './index.less';

const TabPanel = Tabs.TabPane;

class SkinToolComponent extends Component {
    state = {
        collapsed: true
    };
    render() {
        const {theme, onChangeTheme} = this.props;
        const {collapsed} = this.state;
        const classnames = cx('skin-toolbox', {
            'skin-toolbox-close': collapsed
        });
        const changeCollapsed = () => {
            this.setState({
                collapsed: !collapsed
            })
        };
        const onChangeNavBarTheme = e => {
            onChangeTheme({
                ...theme,
                navbar: e.target.value
            })
        };
        const onChangeSideBarTheme = e => {
            onChangeTheme({
                ...theme,
                leftSide: e.target.value
            })
        };
        const onChangeLayoutTheme = value => {
            onChangeTheme({
                ...theme,
                layout: value
            })
        };
        return (
            <div className={classnames}>
                <div className="panel">
                    <div className="panel-head" onClick={changeCollapsed}>
                        <span className="panel-icon">
                            <SettingOutlined />
                        </span>
                        <span className='panel-title'>
                            设置您的主题
                        </span>
                    </div>
                    <div className="panel-body">
                        <Tabs defaultActiveKey='1' size='small'>
                            <TabPanel tab='导航条' key='navbar'>
                                <h4>导航条样式</h4>
                                <NavBarBox theme={theme} onChange={onChangeNavBarTheme} />
                            </TabPanel>
                            <TabPanel tab='侧边栏' key='sidebar'>
                                <h4>侧边栏样式</h4>
                                <SideBarBox theme={theme} onChange={onChangeSideBarTheme} />
                            </TabPanel>
                            <TabPanel tab='布局' key='misc'>
                                <h4>布局</h4>
                                <LayoutBox theme={theme} onChange={onChangeLayoutTheme} />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}



export default connect(null, null)(SkinToolComponent)
