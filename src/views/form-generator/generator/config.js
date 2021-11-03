// 输入型组件
export const inputComponents = [
    {
        config: {
            label: '单行文本',
            labelAlign: 'left',
            labelCol: {
                span: 2
            },
            labelWidth: null,
            tooltip: '',
            showLabel: true,
            tag: 'Input',
            tagIcon: 'input',
            defaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            wrapperCol: {
                span: 22
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
