import React, {useState} from 'react';
import {inputComponents} from '../generator/config';
import {cloneDeep} from 'lodash';
import uniqueId from 'lodash/uniqueId';
import {Button, Form, Input, message, Tabs} from 'antd';
import cx from 'classnames';
import {ClearOutlined} from '@ant-design/icons';
import {ReactSortable} from 'react-sortablejs';
import CompAttr from '../component/CompAttr';
import Preview from '../component/Preview';
import './form-config.less'
const {TextArea} = Input;
const {Item} = Form;
const {TabPane} = Tabs;
const GlobalComponent = {
    Input,
    TextArea
};
const FormConfig = ({
    changeFlag
}) => {
    const [leftComponents] = useState([
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
    ]);
    const [sortList, setSortList] = useState([]);
    const [drawingList, setDrawingList] = useState([]);
    const [activeId, setActiveId] = useState('');
    const [activeItem, setActiveItem] = useState({});
    const [attrArr] = useState([
        'placeholder', 'style', 'addonBefore', 'addonAfter', 'allowClear',
        'bordered', 'disabled', 'maxLength', 'type', 'showCount', 'rows'
    ]);
    const [needDelay] = useState([
        'allowClear', 'bordered', 'disabled', 'showCount',
        'required'
    ]); // 属性发生改变时，需要延迟加载的属性名，如switch组件
    const [isVisiblePreview, setIsVisiblePreview] = useState(false);


    // 点击添加组件
    const addComponents = item => {
        let arr = cloneDeep(drawingList);
        item.__vModel__ = `${uniqueId('field')}`;
        item.formId = `${uniqueId('form-id-')}`;
        arr.push(item);
        setDrawingList(arr);
        setActiveId(item.formId);
        setActiveItem(item);
    };
    // 清空组件
    const emptyDrawingList = () => {
        setDrawingList([]);
    };
    // 删除组件
    const clearDrawingList = (e, item) => {
        e.stopPropagation();
        let originList = cloneDeep(drawingList);
        originList.map((ele, index) => {
            if (item.formId === ele.formId) {
                originList.splice(index, 1);
                setDrawingList(originList);
                setActiveId(drawingList[drawingList.length - 1].formId);
                setActiveItem(drawingList[drawingList.length - 1]);
            }
        });
    };
    const showData = () => {
        console.log(drawingList);
    };
    // 点击运行
    const showPreview = () => {
        if(drawingList.length === 0) {
            message.error('请至少添加一个组件');
            return false;
        }
        setIsVisiblePreview(true);
    };
    // 关闭预览
    const closePreview = () => {
        setIsVisiblePreview(false);
    };
    // 切换选中项
    const changeActiveItem = item => {
        setActiveId(item.formId);
        setActiveItem(item);
    };
    const changeFieldValue = (changedFields, allFields) => {
        let temp = {};
        allFields.map(item => {
            temp[item.name[0]] = item.value;
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
                        setActiveId(activeTemp.formId);
                        setActiveItem(activeTemp);
                    }, 10);
                }
            }
        });
        setDrawingList(tempDrawingList);
    };
    const loop = (arr, index) => {
        return arr.map((item, i) => {
            const indexs = index === '' ? String(i) : `${index}-${i}`;
            const ComponentInfo = GlobalComponent[item.config.tag];
            const activeForm = cx({
                'active-form-item': item.formId === activeId,
                'form-item-item': true
            });
            return (
                <div data-id={indexs} key={indexs}
                     onClick={e => changeActiveItem(item)}
                     className={activeForm}
                >
                    <div className="clear-icon" onClick={e => clearDrawingList(e, item)}>
                        <ClearOutlined />
                    </div>
                    <Item
                        label={item.config.label}
                        labelAlign={item.config.labelAlign}
                        labelCol={{
                            span: item.config.colSpan
                        }}
                        name={item.__vModel__}
                        required={item.config.required}
                        tooltip={item.config.tooltip}
                        initialValue={item.config.fieldDefaultValue}
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
    return (
        <div className='form-config-container'>
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
                                            setList={setSortList}
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
                    <div className="operate-btn">
                        <Button type='default' onClick={e => showPreview()}>运行</Button>
                        <Button type='default' onClick={e => emptyDrawingList()}>清空</Button>
                    </div>
                    <div className="right">
                        <Button type='primary' onClick={e => changeFlag()}>返回</Button>
                    </div>
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
                        setList={setDrawingList}
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
            {
                isVisiblePreview &&
                <Preview
                    renderList={drawingList}
                    isVisiblePreview={isVisiblePreview}
                    closePreview={closePreview}
                />
            }
        </div>
    )
};

export default FormConfig;
