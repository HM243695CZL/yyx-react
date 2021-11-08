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

module.exports = {
    getFormKeyValue
};
