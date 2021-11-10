// 工具库

/**
 * 获取表单配置项的键值对
 * @param configItemList
 */
function getFormKeyValue(configItemList) {
    configItemList.map(item => {
        console.log(item.__vModel__);
        console.log(item.config.defaultValue);
    });
    return 1;
}

/**
 * 对渲染的字段进行非空验证
 */
function requiredFieldValidate(arr, validObj) {
    let tipMessage = '';
    for (let i = 0; i <= arr.length - 1; i++) {
        let item = arr[i];
        if (item.config.required) {
            if (!validObj[item.__vModel__] || validObj[item.__vModel__] === false) {
                tipMessage = item.config.label + '不能为空';
                break;
            }
        }
    }
    return {
        valid: tipMessage === '',
        message: tipMessage
    }
}
module.exports = {
    getFormKeyValue,
    requiredFieldValidate
};
