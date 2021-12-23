import React, {useState, useEffect} from 'react';
import {inputComponents, selectComponents} from '../generator/config';
import {cloneDeep} from 'lodash';
import uniqueId from 'lodash/uniqueId';
import dayjs from 'dayjs';
import {
    Button, Form, Input, message, Tabs, Modal,
    Upload
} from 'antd';
import cx from 'classnames';
import {ClearOutlined, UploadOutlined} from '@ant-design/icons';
import {ReactSortable} from 'react-sortablejs';
import html2canvas from 'html2canvas';
import CompAttr from '../component/CompAttr';
import Preview from '../component/Preview';
import './form-config.less'
import {saveFormConfigApi, updateFormConfigApi} from '@/api/formConfig';
import {RES_STATUS} from '@/utils/code';

const {TextArea} = Input;
const {Item} = Form;
const {TabPane} = Tabs;
const GlobalComponent = {
    Input,
    TextArea,
    Upload
};
const FormConfig = ({
    changeFlag,
    data
}) => {
    const [form] = Form.useForm();
    const [leftComponents] = useState([
        {
            title: '输入型组件',
            list: inputComponents
        },
        {
            title: '选择型组件',
            list: selectComponents
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
        'bordered', 'disabled', 'maxLength', 'type', 'showCount', 'rows',
        'accept', 'action', 'listType', 'maxCount'
    ]);
    const [extraArr] = useState(['buttonText']);
    const [needDelay] = useState([
        'allowClear', 'bordered', 'disabled', 'showCount',
        'required'
    ]); // 属性发生改变时，需要延迟加载的属性名，如switch组件
    const [hasChildComp] = useState(['Upload']);
    const [isVisiblePreview, setIsVisiblePreview] = useState(false);
    const [isVisibleForm, setIsVisibleForm] = useState(false);
    const [formCfg, setFormCfg] = useState({
        name: '',
        remark: '',
        formKey: ''
    });

    // 点击添加组件
    const addComponents = item => {
        let arr = cloneDeep(drawingList);
        item.__vModel__ = `${uniqueId('field')}`;
        item.formId = `${uniqueId('form-id-')}${dayjs().format('YYYY-MM-DD_HH-mm-ss')}`;
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
    // 显示保存配置弹窗
    const showConfigForm = () => {
        if(drawingList.length === 0) {
            message.error('请至少添加一个组件');
            return false;
        }
        setIsVisibleForm(true);
    };
    // 保存配置
    const saveConfig = () => {
        form.validateFields().then(val => {
            html2canvas(document.querySelector('.form-item'), {
                allowTaint: false,
                useCORS: true,
            }).then(canvas => {
                const screenShot = canvas.toDataURL('image/png');
                if (data && data.id) {
                    updateFormConfigApi({
                        ...val,
                        screenShot,
                        configData: JSON.stringify(drawingList),
                        id: data.id
                    }).then(res => {
                        if(res.code === RES_STATUS.SUCCESS_CODE) {
                            changeFlag();
                            message.success(res.data.message);
                        } else {
                            message.error(res.data.message);
                        }
                    })
                } else {
                    saveFormConfigApi({
                        ...val,
                        screenShot,
                        configData: JSON.stringify(drawingList)
                    }).then(res => {
                        if(res.code === RES_STATUS.SUCCESS_CODE) {
                            changeFlag();
                            message.success(res.data.message);
                        } else {
                            message.error(res.data.message);
                        }
                    })
                }
            });
        });
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
                extraArr.map(ele => {
                   if(temp.hasOwnProperty(ele)) {
                       let extraObj = {};
                       extraObj[ele] = temp[ele];
                       activeTemp.extra = {
                           ...activeTemp.extra,
                           ...extraObj
                       };
                       delete temp[ele];
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
                        {
                            hasChildComp.includes(item.config.tag) ?
                                <ComponentInfo {...item.attr}>
                                    <Button icon={<UploadOutlined />}>{item.extra.buttonText}</Button>
                                </ComponentInfo>
                                :
                                <ComponentInfo {...item.attr} />
                        }
                    </Item>
                </div>
            )
        })
    };
    useEffect(() => {
        if (data) {
            setDrawingList(JSON.parse(data.configData));
            setFormCfg({
                name: data.name,
                remark: data.remark,
                formKey: data.formKey
            })
        }
    }, [data]);
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
                        <Button type='primary' onClick={e => showConfigForm()}>保存</Button>
                        <Button type='default' onClick={e => changeFlag()}>返回</Button>
                    </div>
                </div>
                <Form
                    autoComplete='off'
                >
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
            <Modal
                title='保存配置'
                visible={isVisibleForm}
                okText='确定'
                cancelText='取消'
                onOk={e => saveConfig()}
                onCancel={e => setIsVisibleForm(false)}
                maskClosable={false}
                width='650px'
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    form={form}
                    autoComplete='off'
                    initialValues={formCfg}
                >
                    <Item
                        label='表单名称'
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '表单名称不能为空'
                            }
                        ]}
                    >
                        <Input/>
                    </Item>
                    <Item
                        label='表单key'
                        name='formKey'
                        rules={[
                            {
                                required: true,
                                message: '表单key不能为空'
                            }
                        ]}
                    >
                        <Input/>
                    </Item>
                    <Item
                        label='备注'
                        name='remark'
                    >
                        <Input/>
                    </Item>
                </Form>
            </Modal>
        </div>
    )
};

export default FormConfig;
