import React, {useState} from 'react';
import {Modal, message} from 'antd';
import RenderItem from './RenderItem';

const Preview = ({
    renderList,
    isVisiblePreview,
    closePreview
}) => {
    const [params, setParams] = useState({});
    const changeFieldValue = (changedFields, allFields) => {
        let temp = {};
        allFields.map(item => {
            temp[item.name[0]] = item.value;
        });
        setParams(temp);
    };
    const confirm = () => {
        let tipMessage = '';
        for (let i = 0; i <= renderList.length - 1; i++) {
            let item = renderList[i];
            if (item.config.required) {
                if (!params[item.__vModel__] || params[item.__vModel__ === false]) {
                    tipMessage = item.config.label + '不能为空';
                    break;
                }
            }
        }
        if (tipMessage) {
            message.error(tipMessage);
            return false;
        }
    };
    return (
        <Modal
            title='预览渲染'
            visible={isVisiblePreview}
            onOk={e => confirm()}
            onCancel={closePreview}
            maskClosable={false}
            width='45%'
        >
            <RenderItem
                componentList={renderList}
                changeFieldValue={changeFieldValue}
            />
        </Modal>
    )
};
export default Preview
