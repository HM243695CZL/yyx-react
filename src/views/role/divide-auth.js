import React, {useEffect, useState} from 'react';
import {Form, Modal, Tree} from 'antd';
import {getMenuListApi} from '@/api/menu'
import {getDivideAuthApi} from '@/api/role';
import {RES_STATUS} from '@/utils/code';
import {arrayToTree, objectArraySort} from '@/utils';

const DivideAuth = ({
    isShow,
    title,
    confirm,
    cancel,
    divideObj
}) => {
    const [treeData, setTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const submit = () => {
        confirm(checkedKeys)
    };
    useEffect(() => {
        if (isShow) {
            getMenuListApi().then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    let data = arrayToTree(res.datas, 'id', 'parentId');
                    data.map(item => {
                        if(item.children && item.children.length) {
                            item.children.sort(objectArraySort('sortNum'))
                        }
                    });
                    setTreeData(data);
                }
            });
            getDivideAuthApi({
                id: divideObj.divideId
            }).then(res => {
                if (res.code === RES_STATUS.SUCCESS_CODE) {
                    setCheckedKeys(res.datas);
                }
            })
        }
    }, [isShow]);
    return (
        <div className='divide-auth-container'>
            <Modal
                title={title}
                visible={isShow}
                onOk={submit}
                onCancel={cancel}
                okText='确定'
                cancelText='取消'
                maskClosable={false}
                width={'30%'}
            >
                <Tree
                    checkable
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    fieldNames={{title: 'title', key: 'id', children: 'children'}}
                    treeData={treeData}
                />
            </Modal>
        </div>
    )
};
export default DivideAuth;
