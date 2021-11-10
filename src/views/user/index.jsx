import React, {Component} from 'react';
import UserModal from './userModal';
import {connect} from 'react-redux'
import {Tag, Table, Button, message} from 'antd';
import {getUserListApi, saveUserApi, updateUserApi, deleteUserApi} from '@/api/user';
import {viewFormConfigApi} from '@/api/formConfig';
import {RES_STATUS} from '@/utils/code';
import Pagination from '@/components/Pagination';
import './index.less';

class User extends Component {
    state = {
        dataList: [],
        renderList: [],
        total: 0,
        title: '',
        userId: '',
        isVisible: false
    };

    componentWillMount() {
        this.getDataList();
        this.getFormConfig();
    }

    getDataList() {
        getUserListApi({
            page: 0,
            size: 10
        }).then(res => {
            if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                this.setState({
                    dataList: res.data,
                    total: res.total
                })
            }
        })
    }

    getFormConfig() {
        viewFormConfigApi({
            formKey: this.props.formInfo.UserFormKey
        }).then(res => {
            if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                this.setState({
                    renderList: JSON.parse(res.data.configData)
                })
            } else {
                message.error('获取表单配置失败，请重试!');
            }
        })
    }

    render() {
        const { dataList, title, isVisible, userId, total, renderList } = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: data => {
                    return (
                        <span>{data ? <Tag color='#87d068'>启用</Tag> : <Tag color='#f50'>禁用</Tag>}</span>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 120,
                render(data) {
                    return (
                        <div className='operate-column'>
                            <span className='operate-edit' onClick={showModal(data)}>修改</span>
                            <span className="operate-del" onClick={delUser(data)}>删除</span>
                        </div>
                    )
                }
            }
        ];
        const showModal = data => {
          return e => {
              if (data) {
                  // 修改
                  this.setState({
                      isVisible: true,
                      title: '修改用户',
                      userId: data.user_id
                  })
              } else {
                  // 新增
                  this.setState({
                      isVisible: true,
                      title: '新增用户',
                      userId: null,
                      renderList
                  })
              }
          }
        };
        const delUser = ({user_id}) => {
          return e => {
              deleteUserApi({user_id}).then(res => {
                  if (res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                      message.success(res.message);
                      this.getDataList();
                  } else {
                      message.error(res.message);
                  }
              })
          }
        };
        const confirm = val => {
            if (val.user_id) {
                updateUserApi(val).then(res => {
                    if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.message);
                        this.getDataList();
                        this.setState({
                            isVisible: false
                        });
                    } else {
                        message.error(res.message);
                    }
                })
            } else {
                saveUserApi(val).then(res => {
                    if(res.head.errorCode === RES_STATUS.SUCCESS_CODE) {
                        message.success(res.message);
                        this.getDataList();
                        this.setState({
                            isVisible: false
                        });
                    } else {
                        message.error(res.message);
                    }
                })
            }
        };
        const cancel = () => {
            this.setState({
                isVisible: false
            })
        };
        return (
            <div className='user-container'>
                <div className="btn-box">
                    <Button type='primary' onClick={showModal()}>新增</Button>
                    <Button type='default' onClick={e => this.getDataList()}>查询</Button>
                </div>
                <Pagination>
                    <Table
                        rowKey={record => record.user_id}
                        columns={columns}
                        dataSource={dataList}
                        bordered
                        pagination={{
                            total,
                            showSizeChanger: true,
                            showTotal: total => `共${total}条`,
                            onChange: (current, pageSize) => {
                                console.log(current);
                                console.log(pageSize);
                            }
                        }}
                    />
                </Pagination>
                <UserModal
                    title={title}
                    isVisible={isVisible}
                    id={userId}
                    renderList={renderList}
                    confirm={confirm}
                    cancel={cancel}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    formInfo: state.user.formInfo
});
export default connect(mapStateToProps, null)(User)
