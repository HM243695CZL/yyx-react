import React, {Component} from 'react';
import {connect} from 'react-redux';
import Panel from '@/components/Panel'
import {Row, Col, Tabs} from 'antd';
import cx from 'classnames';
import './index.less';
const { TabPane } = Tabs;

class Dashboard extends Component{

    state = {
        quickCardHeight: 260,
        tabList: [
            {value: 'room', text: '我的实训室'},
            {value: 'schedule', text: '我的课表'}
        ],
        activeTab: 'room'
    };



    render() {
        const {quickCardHeight, tabList, activeTab} = this.state;
        const close = () => {
            return e => {
                console.log('close panel');
            }
        };
        const test = data => {
            this.setState({
                ...this.state,
                activeTab: data.value
            })
        };
        const QuickHeader = (
            <div className='quick-header'>
                {
                    tabList.map(item => (
                        <span
                            className={cx('tab', {
                                'active': activeTab === item.value
                            })}
                            key={item.value}
                            onClick={e => test(item)}>
                            {item.text}
                        </span>
                    ))
                }
            </div>
        );
        return (
            <div className='dashboard-container'>
                <Row gutter={10}>
                    <Col md={8}>
                        <Panel title='快捷通道' height={quickCardHeight} showControl>
                            快捷通道
                        </Panel>
                    </Col>
                    <Col md={8}>
                        <Panel title='代办事项' height={quickCardHeight} showControl>
                            代办事项
                        </Panel>
                    </Col>
                    <Col md={8}>
                        <Panel title='我的课堂' height={quickCardHeight} showControl>
                            我的课堂
                        </Panel>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={16}>
                        <Panel title={QuickHeader} height={450} showControl>
                            我的实训室-我的课表
                        </Panel>
                    </Col>
                    <Col md={8}>
                        <Panel title='进行中考试' height={200} showControl>
                            进行中考试
                        </Panel>
                        <Panel title='学习任务' height={200} showControl>
                            学习任务
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }

}
export default connect(null, null)(Dashboard);
