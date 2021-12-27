import React from 'react'
import { useHistory } from 'react-router-dom'
import {Modal, Button} from 'antd';

const ReLogin = props => {
    const history = useHistory();
    const toLogin = () => {
        history.replace('/login');
    };
    return (
        <Modal
            title='【提示信息】'
            visible={true}
            maskClosable={false}
            footer={[
                <Button
                    key='to-login'
                    type='primary'
                    onClick={e => toLogin()}
                >
                    前往登录
                </Button>
            ]}
        >
            您的登录信息已失效，请重新登录
        </Modal>
    )
};

export default ReLogin;
