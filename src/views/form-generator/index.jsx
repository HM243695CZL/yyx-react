import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.less';
import cx from 'classnames';
import {Button, Form, Input, Tabs} from 'antd';
import {ReactSortable} from 'react-sortablejs';
import uniqueId from 'lodash/uniqueId';
import {cloneDeep} from 'lodash'
import update from 'immutability-helper';
import {inputComponents} from './generator/config';
import CompAttr from './CompAttr'

const GlobalComponent = {
    Input
};
const {Item} = Form;
const { TabPane } = Tabs;

class FormGeneratorComponent extends Component {
    state = {
        leftComponents: [
            {
                title: '输入型组件',
                list: inputComponents
            },
            {
                title: '选择型组件',
                list: []
            },
            {
                title: '布局型组件',
                list: []
            }
        ],
        drawingList: [],
        activeId: '',
        activeItem: {},
    };
    sortableAdd = evt => {
        console.log('add');
        console.log(evt);
    };
    sortableUpdate = evt => {
        console.log('update');
        console.log(evt);
    };

    render() {
        const {leftComponents, drawingList, activeId, activeItem} = this.state;
        const loop = (arr, index) => {
            return arr.map((item, i) => {
                const indexs = index === '' ? String(i) : `${index}-${i}`;
                const ComponentInfo = GlobalComponent[item.config.tag];
                const activeForm = cx({
                    'active-form-item': item.formId === activeId
                });
                return (
                    <div data-id={indexs} key={indexs}
                         onClick={e => changeActiveItem(item)}
                         className={activeForm}
                    >
                        <Item
                            label={item.config.label}
                            // labelAlign={item.config.labelAlign}
                            // labelCol={item.config.labelCol}
                            name={item.__vModel__}
                            rules={item.config.regList}
                            tooltip={item.config.tooltip}
                            initialValue={item.config.defaultValue}
                            wrapperCol={item.config.wrapperCol}
                        >
                            <ComponentInfo {...item.attr} />
                        </Item>
                    </div>
                )
            })
        };
        // 点击添加组件
        const addComponents = item => {
            let arr = cloneDeep(drawingList);
            item.__vModel__ = `${uniqueId('field')}`;
            item.formId = `${uniqueId('form-id-')}`;
            arr.push(item);
            this.setState({
                ...this.state,
                drawingList: arr
            });
        };
        const showData = () => {
            console.log(drawingList);
        };
        const changeActiveItem = item => {
            this.setState({
                ...this.state,
                activeId: item.formId,
                activeItem: item
            })
        };
        const changeFieldValue = data => {
            let temp = {};
            data.map(item => {
                temp[item.name[0]] = item.value;
            });
            let activeTemp = cloneDeep(activeItem);
            let tempDrawingList = cloneDeep(drawingList);
            tempDrawingList.map((item, index) => {
                if (item.formId === activeItem.formId) {
                    activeTemp.__vModel__ = temp['__vModel__'];
                    delete temp.__vModel__;
                    activeTemp.config = {
                        ...item.config,
                        ...temp
                    };
                    tempDrawingList.splice(index, 1, activeTemp);
                }
            });
            this.setState({
                ...this.state,
                drawingList: tempDrawingList
            });
        };
        return (
            <div className='form-generator-container'>
                <div className="left-board">
                    <div className="component-list">
                        组件列表
                        {
                            leftComponents.map(item => {
                                return (
                                    <div className="component-item" key={item.title}>
                                        <div className="component-title">
                                            <i className='iconfont icon-component'/>
                                            {item.title}
                                        </div>
                                        <div className="component-drag">
                                            <ReactSortable
                                                className='drag-item'
                                                group={{
                                                    name: 'formItem',
                                                    pull: 'clone',
                                                    put: false
                                                }}
                                                animation={150}
                                                swapThreshold={.65}
                                                list={item.list}
                                                setList={newState => this.setState({})}
                                            >
                                                {
                                                    item.list.map(ele => {
                                                        const classnames = cx('iconfont', 'icon-' + ele.config.tagIcon);
                                                        return (
                                                            <div key={ele.config.tag} onClick={e => addComponents(ele)}>
                                                                <i className={classnames}/>
                                                                {ele.config.label}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </ReactSortable>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Button type='primary' onClick={e => showData()}>查看数据</Button>
                </div>
                <div className="center-board">
                    <Form>
                        <ReactSortable
                            className='form-item'
                            group={{
                                name: 'formItem',
                                pull: true,
                                put: true
                            }}
                            animation={150}
                            swapThreshold={.65}
                            list={drawingList}
                            setList={newState => this.setState({
                                ...this.state,
                                drawingList: newState
                            })}
                            onUpdate={evt => this.sortableUpdate(evt)}
                            onAdd={evt => this.sortableAdd(evt)}
                        >
                            {
                                loop(drawingList, '')
                            }
                        </ReactSortable>
                    </Form>
                </div>
                <div className="right-board">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="组件属性" key="1">
                            {
                                JSON.stringify(activeItem) !== '{}' &&
                                <CompAttr
                                    activeItem={activeItem}
                                    changeFieldValue={changeFieldValue}
                                />
                            }
                        </TabPane>
                        <TabPane tab="表单属性" key="2">
                            表单属性
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(FormGeneratorComponent);
