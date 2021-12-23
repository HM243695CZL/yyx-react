// 输入型组件
export const inputComponents = [
    {
        config: {
            label: '单行文本',
            labelAlign: 'right',
            tooltip: '',
            tag: 'Input',
            tagIcon: 'input',
            fieldDefaultValue: undefined,
            required: true,
            layout: 'colFormItem',
            span: 24,
            colSpan: 4,
            regList: []
        },
        extra: {

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
            type: 'text'
        }
    },
    {
        config: {
            label: '多行文本',
            labelAlign: 'right',
            tooltip: '',
            tag: 'TextArea',
            tagIcon: 'textarea',
            fieldDefaultValue: undefined,
            required: true,
            layout:'colFormItem',
            span: 24,
            colSpan: 4,
            regList: []
        },
        extra: {

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
// 选择型组件
export const selectComponents = [
    {
        config: {
            label: '上传',
            labelAlign: 'right',
            tooltip: '',
            tag: 'Upload',
            tagIcon: 'up-load',
            fieldDefaultValue: [],
            required: true,
            layout: 'colFormItem',
            span: 24,
            colSpan: 4,
            regList: []
        },
        extra: {
            buttonText: '上传'
        },
        attr: {
            accept: ['.jpg', '.jpeg', '.png'],
            action: window.PLATFORM_CONFIG.baseUrl + '/upload',
            fileList: [],
            listType: 'text',
            maxCount: 1,
            disabled: false
        }
    }
];
