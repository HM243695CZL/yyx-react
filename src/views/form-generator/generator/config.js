// 输入型组件
export const inputComponents = [
    {
        config: {
            label: '单行文本',
            labelAlign: 'right',
            tooltip: '',
            showLabel: true,
            tag: 'Input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            wrapperCol: {
                span: 24
            },
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
            }
        }
    }
];
