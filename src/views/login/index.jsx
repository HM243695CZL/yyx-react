import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {message} from 'antd';
import Particles from 'react-particles-js';
import PropTypes from 'prop-types'
import {login} from '@/store/actions';
import {particles} from './params';
import './index.less'
import {RES_STATUS} from '@/utils/code';
import {getMenuListApi} from '@/api/menu'
import {arrayToTree, setMenu, objectArraySort} from '@/utils';

class Login extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    state = {
        loading: false
    };

    handleSubmit = val => {
        const {username, password} = val;
        this.login({username, password})
    };

    login = formVal => {
        const {handleLogin} = this.props;
        handleLogin(formVal).then(res => {
            if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                // 获取菜单列表
                this.getMenuList();
            } else {
                message.error(res.message);
            }
        });
    };

    getMenuList = () => {
        getMenuListApi({
            page: 0,
            size: 20
        }).then(res => {
            if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                let data = arrayToTree(res.data, 'id', 'parentId')
                data.map(item => {
                    if(item.children && item.children.length) {
                        item.children.sort(objectArraySort('sortNum'))
                    }
                });
                setMenu(JSON.stringify(data.sort(objectArraySort('sortNum'))));
                const {history} = this.props;
                history.replace('/dashboard');
                // 通过重新刷新来实现路由表的渲染
                window.location.reload();
            }
        })
    };

    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <div className='login-container'>
                <Particles params={{particles}} style={{width:'100%',height:'100%'}} />
                <div className="wrapper">
                    <div className="title">登录</div>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            ['username']: '',
                            ['password']: ''
                        }}
                        onFinish={this.handleSubmit}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input autoComplete='off'
                                   name='username' />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]}
                        >
                            <Input autoComplete='off'
                                   name='password' />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className='login-btn'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = ({
    handleLogin: params => login(params)
});

export default connect(state => ({collapsed: state.UI.tagList}), mapDispatchToProps)(Login)
