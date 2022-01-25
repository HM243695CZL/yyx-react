import React, { useState, useEffect} from 'react';
import {
    Form, Input, Row, Col, Select, InputNumber,
    Switch, Card, Upload, Button, message, Checkbox
} from 'antd';
import {getGoodsTypeListApi} from '@/api/goodsType';
import {getGoodsArgsListApi} from '@/api/goodsArgs';
import {saveGoodsApi} from '@/api/goods';
import { uploadFileApi } from '@/api/common';
import './index.less';
import {RES_STATUS} from '@/utils/code';
const {Item} = Form;
const {TextArea} = Input;
const {Option} = Select;
const { Group } = Checkbox;
const GoodsInfo = props => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [goodsTypeList, setGoodsTypeList] = useState([]);
    const [goodsArgsList, setGoodsArgsList] = useState([]);
    const [argsId, setArgsId] = useState([]);
    const [argsArrItem, setArgsArrItem] = useState([]);
    const [coverImgId, setCoverImgId] = useState('');
    const customUploadImg = files => {
        const { file } = files;
        let formData = new FormData();
        formData.append('file', file);
        uploadFileApi(formData).then(res => {
            setFileList([
                ...fileList,
                {
                    uid: res.data.id,
                    name: file.name,
                    status: 'done'
                }
            ]);
            setCoverImgId(res.data.id);
        })
    };
    const changeArgsId = value => {
        let arr = [];
        goodsArgsList.map(item => {
            if (value.includes(item.value)) {
                arr.push(item);
            }
        });
        setArgsArrItem(arr);
    };
    const changeArgs = (value, data) => {
        argsArrItem.map(item => {
            if (item.value === data.value) {
                item.val = value.target.value;
            }
        });
        setArgsArrItem([...argsArrItem]);
    };
    const clickConfirm = () => {
        form.validateFields().then(val => {
            let obj = {
                ...val,
                coverImgId,
                argsId: JSON.stringify(argsArrItem)
            };
            saveGoodsApi(obj).then(res => {
                console.log(res);
            })
        });
    };
    const getGoodsTypeList = () => {
        getGoodsTypeListApi().then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE) {
                setGoodsTypeList(res.data);
            } else {
                message.error(res.message);
            }
        })
    };
    const getGoodsArgsList = () => {
        getGoodsArgsListApi().then(res => {
            if (res.code === RES_STATUS.SUCCESS_CODE) {
                let arr = [];
                res.data.map(item => {
                    arr.push({
                        label: item.argsCnName,
                        value: item.id,
                        text: item.argsEnName
                    })
                });
                setGoodsArgsList(arr);
            } else {
                message.error(res.message);
            }
        })
    };
    useEffect(() => {
        getGoodsTypeList();
        getGoodsArgsList();
    }, []);
    return (
        <div className='goods-info-container'>
            <Form
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                autoComplete='off'
                form={form}
            >
                <Card title="商品信息">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Item
                                label='商品描述'
                                name='title'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品描述不能为空'
                                    }
                                ]}
                            >
                                <TextArea rows={1} />
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='商品原价'
                                name='originPrice'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品原价不能为空'
                                    }
                                ]}
                            >
                                <InputNumber className='w100'/>
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='商品售价下限'
                                name='sellPriceStart'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品售价下限不能为空'
                                    }
                                ]}
                            >
                                <Input/>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Item
                                label='商品售价上限'
                                name='sellPriceEnd'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品售价上限不能为空'
                                    }
                                ]}
                            >
                                <Input/>
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='商品类别'
                                name='categoryId'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品类别不能为空'
                                    }
                                ]}
                            >
                                <Select>
                                    {
                                        goodsTypeList.map(item => <Option key={item.id} value={item.id}>{item.typeName}</Option>)
                                    }
                                </Select>
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='商品库存'
                                name='stock'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品库存不能为空'
                                    }
                                ]}
                            >
                                <InputNumber className='w100'/>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Item
                                label='发货时间'
                                name='deliveryTime'
                                rules={[
                                    {
                                        required: true,
                                        message: '发货时间不能为空'
                                    }
                                ]}
                            >
                                <InputNumber className='w100' />
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='商品封面'
                                name='coverImgId'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品封面不能为空'
                                    }
                                ]}
                            >
                                <Upload
                                    fileList={fileList}
                                    customRequest={e => customUploadImg(e)}
                                >
                                    <Button>上传封面</Button>
                                </Upload>
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='是否包邮'
                                name='freeShopping'
                            >
                                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
                            </Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="商品参数">
                    <Row gutter={16}>
                        <Col span={24}>
                            可选参数：
                            <Group options={goodsArgsList} defaultValue={argsId} onChange={changeArgsId} />
                            <div className='box'>
                                {
                                    argsArrItem.map(item => {
                                        return (
                                            <div className='args-box' key={item.value}>
                                                <div className='key'>{item.label}：</div>
                                                <div className='value'>
                                                    <Input value={item.val} placeholder={item.text} onChange={e => changeArgs(e, item)}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card title="购买须知">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Item
                                label='关于灰粽'
                                name='aboutGoods'
                                rules={[
                                    {
                                        required: true,
                                        message: '关于灰粽不能为空'
                                    }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='关于发货'
                                name='aboutDelivery'
                                rules={[
                                    {
                                        required: true,
                                        message: '关于发货不能为空'
                                    }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='关于退货'
                                name='aboutReturn'
                                rules={[
                                    {
                                        required: true,
                                        message: '关于退货不能为空'
                                    }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Item>
                        </Col>
                        <Col span={8}>
                            <Item
                                label='注意事项'
                                name='attentionNote'
                                rules={[
                                    {
                                        required: true,
                                        message: '注意事项不能为空'
                                    }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Item>
                        </Col>
                    </Row>
                </Card>
            </Form>
            <div className="btn-box">
                <Button type='cancel'>取消</Button>
                <Button type='primary' onClick={clickConfirm}>确定</Button>
            </div>
        </div>
    )
};

export default GoodsInfo;
