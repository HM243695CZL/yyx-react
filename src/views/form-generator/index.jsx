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
import CompAttr from './CompAttr';
const {TextArea} = Input;
const {Item} = Form;
const {TabPane} = Tabs;
const GlobalComponent = {
    Input,
    TextArea
};

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
        attrArr: [
            'placeholder', 'style', 'addonBefore', 'addonAfter', 'allowClear',
            'bordered', 'disabled', 'maxLength', 'type', 'showCount', 'rows'
        ],
        needDelay: [
            'allowClear', 'bordered', 'disabled', 'showCount',
            'required'
        ], // 属性发生改变时，需要延迟加载的属性名，如switch组件
    };

    componentWillMount() {

    }

    sortableAdd = evt => {
        console.log('add');
        console.log(evt);
    };
    sortableUpdate = evt => {
        console.log('update');
        console.log(evt);
    };

    render() {
        const {
            leftComponents, drawingList, activeId,
            activeItem, attrArr, needDelay
        } = this.state;
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
                            labelAlign={item.config.labelAlign}
                            labelCol={{
                                span: item.config.colSpan
                            }}
                            name={item.__vModel__}
                            required={item.config.required}
                            tooltip={item.config.tooltip}
                            initialValue={item.config.defaultValue}
                            wrapperCol={{
                                span: item.config.span
                            }}
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
                drawingList: arr,
                activeId: item.formId,
                activeItem: item
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
        const changeFieldValue = (changedFields, allFields) => {
            let temp = {};
            allFields.map(item => {
                temp[item.name[0]] = item.value;
                // 将验证规则regList中的数据转为JSON格式
                if (item.name[0] === 'regList') {
                    temp.regList = JSON.parse(item.value);
                }
            });
            let activeTemp = cloneDeep(activeItem);
            let tempDrawingList = cloneDeep(drawingList);
            tempDrawingList.map((item, index) => {
                if (item.formId === activeItem.formId) {
                    activeTemp.__vModel__ = temp['__vModel__'];
                    delete temp.__vModel__;
                    attrArr.map(ele => {
                        if (temp.hasOwnProperty(ele)) {
                            let attrObj = {};
                            attrObj[ele] = temp[ele];
                            activeTemp.attr = {
                                ...activeTemp.attr,
                                ...attrObj
                            };
                            delete temp[ele]
                        }
                    });
                    activeTemp.config = {
                        ...item.config,
                        ...temp
                    };
                    tempDrawingList.splice(index, 1, activeTemp);
                    if (needDelay.includes(changedFields[0].name[0])) {
                        setTimeout(() => {
                            // 这里不知道为什么不能改变选中项的switch组件
                            // 只能延迟模拟调用changeActiveItem切换选项
                            this.setState({
                                ...this.state,
                                activeId: activeTemp.formId,
                                activeItem: activeTemp
                            })
                        }, 10);
                    }
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
                                                className='component-drag-box'
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
                                                            <div className='drag-item' key={ele.config.tag} onClick={e => addComponents(ele)}>
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
                    <div className="action-bar">
                        <Button type='default'>运行</Button>
                        <Button type='default'>清空</Button>
                    </div>
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
