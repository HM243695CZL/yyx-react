import React, { useEffect, useState } from 'react';
import { Modal, message, Button } from 'antd';
import { viewUserApi } from '@/api/user';
import RenderItem from '@/components/RenderItem';
import {RES_STATUS} from '@/utils/code';
import tools from '@/utils/tool';
import {cloneDeep} from 'lodash';
const UserModal = ({
    title,
    isVisible,
    cancel,
    confirm,
    id,
    renderList
}) => {
    const [params, setParams] = useState({});
    const [valueObj, setValueObj] = useState({});
    useEffect(() => {
        if (isVisible) {
            if (id) {
                viewUserApi({
                    id
                }).then(res => {
                    if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        const { username, password, email, mobile } = res.data;
                        let params = {
                            username,
                            password,
                            email,
                            mobile
                        };
                        setValueObj(params);
                        setParams(params);
                    }
                })
            } else {
                setValueObj({});
            }
        }
    }, [isVisible, id]);
    const submit = () => {
        const res = tools.requiredFieldValidate(renderList, params);
       if (res.valid) {
           let val = cloneDeep(params);
           val.user_id = id;
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
    return (
        <div className='user-modal-container'>
            <Modal
                getContainer={false}
                title={title}
                visible={isVisible}
                maskClosable={false}
                width={'30%'}
                onCancel={cancel}
                footer={[
                    <Button key='user-cancel' type='default' onClick={cancel}>取消</Button>,
                    <Button key='user-confirm' type='primary' onClick={submit}>确定</Button>
                ]}
            >
                <RenderItem
                    componentList={renderList}
                    changeFieldValue={changeFieldValue}
                    valueObj={valueObj}
                />
            </Modal>
        </div>
    )
};

export default UserModal
