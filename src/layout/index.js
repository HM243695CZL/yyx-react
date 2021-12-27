import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import SideBar from './sideBar'
import Header from './header'
import AppMain from './appMain'
import ReLogin from './relogin';
import {getMenu} from '@/utils';
import SkinTool from '@/components/SkinTool'
import './index.less'
import {getToken} from '../utils';
const { Content } = Layout;

class LayoutComponent extends Component {
    state = {
        theme: {
            leftSide: 'dark',
            navbar: 'grey',
            layout: ['fixedHeader'],
        }
    };

    onChangeTheme = theme => {
        this.setState({
            theme
        })
    };
    render() {
        const { collapsed } = this.props;
        const {theme} = this.state;
        const marginLeft = collapsed ? 80 : 250;
        return (
            <>
                {
                    getToken() ? <Layout className='layout-container'>
                        <SideBar theme={theme} />
                        <Layout style={{marginLeft, transition: 'margin .2s'}}>
                            <Header theme={theme} />
                            <Content className='main-content'>
                                <AppMain />
                            </Content>
                        </Layout>
                        <SkinTool theme={theme} onChangeTheme={this.onChangeTheme} />
                    </Layout> : <ReLogin />
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    collapsed: state.UI.collapsed,
    isMobile: state.UI.isMobile,
    tagList: state.UI.tagList,
    currentPath: state.UI.currentPath
});
export default connect(mapStateToProps, null)(LayoutComponent)
