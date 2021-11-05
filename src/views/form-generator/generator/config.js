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
            required: true,
            layout: 'colFormItem',
            span: 24,
            regList: []
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
            maxLength: 50
        }
    },
    {
        config: {
            label: '多行文本',
            labelAlign: 'right',
            tooltip: '',
            tag: 'TextArea',
            tagIcon: 'textarea',
            defaultValue: undefined,
            required: true,
            layout:'colFormItem',
            span: 24,
            regList: []
        },
        attr: {
            placeholder: '请输入',
            style: {
                width: '100%'
            },
            allowClear: true,
            bordered: true,
            disabled: false,
            showCount: false,
            maxLength: 50,
            rows: 3
        }
    }
];
