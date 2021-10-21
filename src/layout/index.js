import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import SideBar from './sideBar'
import Header from './header'
import Tags from './tags'
import AppMain from './main'
import SkinTool from '@/components/SkinTool'
import './index.less'

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
        const {collapsed} = this.props;
        const {theme} = this.state;
        const marginLeft = collapsed ? 80 : 250;
        return (
            <Layout>
                <SideBar theme={theme} />
                <Layout style={{marginLeft, transition: 'margin .2s'}}>
                    <Header theme={theme} />
                    <Tags theme={theme} />
                    <AppMain theme={theme} />
                </Layout>
                <SkinTool theme={theme} onChangeTheme={this.onChangeTheme} />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    collapsed: state.UI.collapsed,
    isMobile: state.UI.isMobile
});

export default connect(mapStateToProps)(LayoutComponent)
