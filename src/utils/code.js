const RES_STATUS = {
    SUCCESS_CODE: 200
};
/**
 * 分页对象
 */
const PageEntity = {
    first: 1, // 第几页
    rows: 10, // 每页条数
    totalRecords: 1, // 总条数
    sortOrder: -1, // 排序 1：asc升序 -1：desc降序
    filters: {}
};
/**
 * 查询过滤器
 */
const FilterEnum = {
    CONTAINS: 'contains', // 包含
    STARTS_WITH: 'starts-width', // 以xx开始
    ENDS_WITH: 'ends-with', // 以xx结束
    EQUALS: 'equals', // 等于
    IN: 'in', // 在列表中
    IS_NULL: 'is-null', // is null
    LT: 'lt', // 小于
    GT: 'gt', // 大于
    GTE: 'gte', // 大于等于
    LTE: 'lte', // 小于等于
    BETWEEN: 'between',
    NOT_EQ: 'not-eq', // 不等于
};
export {
    RES_STATUS,
    PageEntity,
    FilterEnum
}
