// 输入型组件
export const inputComponents = [
    {
        config: {
            label: '单行文本',
            labelAlign: 'right',
            tooltip: '',
            tag: 'Input',
            tagIcon: 'input',
            defaultValue: undefined,
            layout: 'colFormItem',
            span: 24,
            regList: [
                {
                    required: true,
                    message: '字段为空'
                }
            ]
        },
        attr: {
            placeholder: '请输入',
            style: {
                width: '100%'
            },
            addonBefore: '',
            addonAfter: '',
            allowClear: true,
            bordered: true,
            disabled: false,
            maxLength: 50,
            prefix: 'LikeOutlined'
        }
    }
];
