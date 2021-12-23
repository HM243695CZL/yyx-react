/**
 * 弹窗组件配置
 */
import React, {useState, useEffect} from 'react';
import tools from '@/utils/tool';
import {cloneDeep} from 'lodash';
import RenderItem from '@/components/RenderItem';
import {RES_STATUS} from '@/utils/code';
import {Button, message, Modal} from 'antd';
import PropsTypes from 'prop-types';

const CommonModal = ({
    title,
    isVisible,
    cancel,
    confirm,
    id,
    renderList,
    viewFunc,
    fieldArr,
    reRenderModal,
    width
}) => {
    const [params, setParams] = useState({});
    const [valueObj, setValueObj] = useState({});
    useEffect(() => {
        if (isVisible) {
            if (id) {
                viewFunc({id}).then(res => {
                    if (res.code === RES_STATUS.SUCCESS_CODE) {
                        let params = {};
                        fieldArr.map(item => {
                            params[item] = res.data[item];
                        });
                        setValueObj(params);
                        setParams(params);
                    }
                })
            } else {
                setValueObj({});
                setParams({});
            }
        }
    }, [isVisible, id]);
    const submit = () => {
        const res = tools.requiredFieldValidate(renderList, params);
        if (res.valid) {
            let val = cloneDeep(params);
            if (id) {
                val.id = id;
            }
            confirm(val);
        } else {
            message.error(res.message);
        }
    };
    const changeFieldValue = (changeFields, allFields) => {
        let temp = {};
        allFields.map(item => {
            temp[item.name[0]] = item.value;
        });
        setParams(temp);
    };
    const uploadChange = (uid, key, name) => {
        reRenderModal(uid, key, name)
    };
    return (
        <div className='common-modal-container'>
            <Modal
                getContainer={false}
                title={title}
                visible={isVisible}
                maskClosable={false}
                width={width ? width : '30%'}
                onCancel={cancel}
                footer={[
                    <Button key='user-cancel' type='default' onClick={cancel}>取消</Button>,
                    <Button key='user-confirm' type='primary' onClick={submit}>确定</Button>
                ]}
            >
                <RenderItem
                    componentList={renderList}
                    changeFieldValue={changeFieldValue}
                    uploadChange={uploadChange}
                    valueObj={valueObj}
                />
            </Modal>
        </div>
    )
};
CommonModal.propTypes = {
    title: PropsTypes.string,
    isVisible: PropsTypes.bool,
    cancel: PropsTypes.func,
    confirm: PropsTypes.func,
    id: PropsTypes.string,
    renderList: PropsTypes.array,
    viewFunc: PropsTypes.func,
    fieldArr: PropsTypes.array,
    reRenderModal: PropsTypes.func
};
export default CommonModal
