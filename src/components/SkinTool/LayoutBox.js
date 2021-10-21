import React from 'react';
import {Checkbox, Tag} from 'antd';
const CheckGroup = Checkbox.Group;

const themeData = [
    {text: '固定头部', value: 'fixedHeader'}
];

export default ({theme, onChange}) => (
    <CheckGroup
        onChange={onChange}
        value={theme.layout}
    >
        {
            themeData.map(item => (
                <Checkbox key={item.value} className={item.value} value={item.value}>
                    <Tag>{item.text}</Tag>
                </Checkbox>
            ))
        }
    </CheckGroup>
)
