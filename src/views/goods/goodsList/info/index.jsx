import React, { useState, useEffect} from 'react';
import {
    Form, Input, Row, Col, Select, InputNumber,
    Switch, Card, Upload, Button, message, Checkbox
} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getGoodsTypeListApi} from '@/api/goodsType';
import {getGoodsArgsListApi} from '@/api/goodsArgs';
import {saveGoodsApi, viewGoodsApi, updateGoodsApi} from '@/api/goods';
import { uploadFileApi } from '@/api/common';
import {RES_STATUS} from '@/utils/code';
import { cutTagList, addTagList, changeCurrentPath} from '@/store/actions';
import './index.less';
const {Item} = Form;
const {TextArea} = Input;
const {Option} = Select;
const GoodsInfo = props => {
    const { cutTagList, currentPath, tagList, addTagList, changeCurrentPath } = props;
    const [form] = Form.useForm();
    const [goodsId, setGoodsId] = useState('');
    const [fileList, setFileList] = useState([]);
    const [carouselList, setCarouselList] = useState([]);
    const [goodsTypeList, setGoodsTypeList] = useState([]);
    const [goodsArgsList, setGoodsArgsList] = useState([]);
    const [argsId, setArgsId] = useState([]);
    const [argsArrItem, setArgsArrItem] = useState([]);
    const [coverImgId, setCoverImgId] = useState('');
    const [carouselImgId, setCarouselImgId] = useState([]);
    const [freeShopping, setFreeShopping] = useState(true);
    const [hourList] = useState([2, 6, 12, 24, 48, 72]);
    const customUploadImg = files => {
        const { file } = files;
        let formData = new FormData();
        formData.append('file', file);
        uploadFileApi(formData).then(res => {
            setFileList([
                {
                    uid: res.data.id,
                    name: file.name,
                    thumbUrl: `${window.PLATFORM_CONFIG.previewImgUrl}${res.data.newFileName}`,
                    status: 'done'
                }
            ]);
            setCoverImgId(res.data.id);
        })
    };
    const changeCarousel = files => {
        const { file } = files;
        let formData = new FormData();
        formData.append('file', file);
        uploadFileApi(formData).then(res => {
            setCarouselList([
                ...carouselList,
                {
                    uid: res.data.id,
                    name: file.name,
                    thumbUrl: `${window.PLATFORM_CONFIG.previewImgUrl}${res.data.newFileName}`,
                    status: 'done'
                }
            ]);
            setCarouselImgId([
                ...carouselImgId,
                res.data.id
            ]);
        })
    };
    const changeArgsId = (value, data) => {
        if (value.target.checked) {
            setArgsId([...argsId, data.value]);
            setArgsArrItem([...argsArrItem, data]);
        } else {
            argsArrItem.map((item, index) => {
                if (item.value === data.value) {
                    argsArrItem.splice(index, 1);
                }
            });
            setArgsArrItem([...argsArrItem]);
            argsId.map((item, index) => {
                if (item === data.value) {
                    argsId.splice(index, 1);
                }
            });
            setArgsId([...argsId]);
        }
    };
    const changeFreeShopping = freeShoppingValue => {
        setFreeShopping(freeShoppingValue);
    };
    const changeArgs = (value, data) => {
        argsArrItem.map(item => {
            if (item.value === data.value) {
                item.val = value.target.value;
            }
        });
        setArgsArrItem([...argsArrItem]);
    };
    const clickCancel = () => {
        const length = tagList.length;
        if (length >= 2) {
            console.log(tagList[length - 2].tabKey);
            props.history.push(tagList[length - 2].tabKey);
            changeCurrentPath({
                tabKey: tagList[length - 2].tabKey
            });
        } else {
            props.history.push('/goods/goods-list');
            changeCurrentPath({
                tabKey: '/goods/goods-list'
            });
            addTagList({
                tabKey: '/goods/goods-list'
            })
        }
        cutTagList({
            tabKey: currentPath
        });
    };
    const clickConfirm = () => {
        form.validateFields().then(val => {
            let obj = {
                ...val,
                coverImgId,
                carousel: carouselImgId,
                argsId: JSON.stringify(argsArrItem),
                freeShopping: freeShopping ? 1 : 0
            };
            if (goodsId) {
                updateGoodsApi({
                    ...obj,
                    id: goodsId
                }).then(res => {
                    if (res.code === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.data.message);
                        clickCancel();
                    } else {
                        message.error(res.message);
                    }
                })
            } else {
                saveGoodsApi(obj).then(res => {
                    if (res.code === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.data.message);
                        clickCancel();
                    } else {
                        message.error(res.message);
                    }
                })
            }
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
        if (currentPath.indexOf('goods-id') > -1) {
            setGoodsId(currentPath.split('=')[1]);
            // 查看数据
            viewGoodsApi({
                id: currentPath.split('=')[1]
            }).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    const { id, originFileName, newFileName } = res.data.source;
                    form.setFieldsValue(res.data);
                    setFileList([
                        {
                            uid: id,
                            name: originFileName,
                            status: 'done',
                            thumbUrl: `${window.PLATFORM_CONFIG.previewImgUrl}${newFileName}`
                        }
                    ]);
                    setFreeShopping(res.data.freeShopping);
                    setCoverImgId(id);
                    let arr = [];
                    JSON.parse(res.data.argsId).map(item => {
                       arr.push(item.value);
                    });
                    setArgsId([...arr]);
                    setArgsArrItem(JSON.parse(res.data.argsId));
                }
            })
        }
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
                                <Select>
                                    {
                                        hourList.map(item => <Option value={item} key={item}>{item} 小时</Option>)
                                    }
                                </Select>
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
                                    listType="picture"
                                    maxCount={1}
                                    accept='.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp'
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
                                <Switch checkedChildren="是" unCheckedChildren="否" checked={freeShopping} onChange={changeFreeShopping} />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Item
                                label='商品轮播图'
                                name='carousel'
                                rules={[
                                    {
                                        required: true,
                                        message: '商品轮播图不能为空'
                                    }
                                ]}
                            >
                                <Upload
                                    fileList={carouselList}
                                    listType="picture"
                                    maxCount={5}
                                    accept='.bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp'
                                    customRequest={e => changeCarousel(e)}
                                >
                                    <Button>上传轮播图</Button>
                                </Upload>
                            </Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="商品参数">
                    <Row gutter={16}>
                        <Col span={24}>
                            可选参数：
                            <Row>
                                {
                                    goodsArgsList.map(item => {
                                        return (
                                            <Col span={4} key={item.value}>
                                                <Checkbox value={item.value}
                                                          checked={argsId.includes(item.value)}
                                                          onChange={e => changeArgsId(e, item)}
                                                >{item.label}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
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
                <Button type='cancel' onClick={clickCancel}>取消</Button>
                <Button type='primary' onClick={clickConfirm}>确定</Button>
            </div>
        </div>
    )
};
const mapStateToProps = state => ({
    tagList: state.UI.tagList,
    currentPath: state.UI.currentPath
});
const mapDispatchToProps = dispatch => ({
    cutTagList: payload => {
        dispatch(cutTagList(payload))
    },
    addTagList: payload => {
        dispatch(addTagList(payload))
    },
    changeCurrentPath: payload => {
        dispatch(changeCurrentPath(payload))
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoodsInfo));
