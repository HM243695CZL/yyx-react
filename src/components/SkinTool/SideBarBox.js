import React from 'react';
import {Radio, Tag} from 'antd';
const RadioGroup = Radio.Group;

const themeData = [
    {text: 'Antd深蓝', value: 'dark', color: '#001529'},
    {text: 'Antd亮白', value: 'light', color: '#efefef'}
];
export default ({theme, onChange}) => (
    <RadioGroup
        onChange={onChange}
        value={theme.leftSide}
    >
        {
            themeData.map(item => (
                <Radio key={item.value} className={item.value} value={item.value}>
                    <Tag color={item.color} style={item.value === 'light' ? {color: '#666'} : ''}>{item.text}</Tag>
                </Radio>
            ))
        }
    </RadioGroup>
)
