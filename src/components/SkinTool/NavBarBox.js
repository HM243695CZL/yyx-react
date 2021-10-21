import React from 'react';
import {Radio, Tag} from 'antd';
const RadioGroup = Radio.Group;

const themeData = [
    {text: '默认', value: 'primary', color: '#1890ff'},
    {text: '亮白', value: 'light', color: '#b9b9b9'},
    {text: '宝石', value: 'info', color: '#00bcd4'},
    {text: '阳光', value: 'warning', color: '#ffc107'},
    {text: '热情', value: 'danger', color: '#f44336'},
    {text: '典雅', value: 'alert', color: '#a992e2'},
    {text: '专业', value: 'system', color: '#48c9a9'},
    {text: '生命', value: 'success', color: '#85d27a'},
    {text: '商务', value: 'grey', color: '#30363e'},
    {text: '深蓝', value: 'dark', color: '#001529'}
];
export default ({theme, onChange}) => (
    <RadioGroup
        onChange={onChange}
        value={theme.navbar}
    >
        {
            themeData.map(item => (
                <Radio key={item.value} className={item.value} value={item.value}>
                    <Tag color={item.color}>{item.text}</Tag>
                </Radio>
            ))
        }
    </RadioGroup>
)
