import React from 'react';
import {Modal} from 'antd';
import RenderItem from './RenderItem';

const Preview = ({
    renderList,
    isVisiblePreview,
    closePreview
}) => {
    const confirm = () => {

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
            <RenderItem componentList={renderList} />
        </Modal>
    )
};
export default Preview
