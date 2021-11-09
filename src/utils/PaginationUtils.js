function filters(value, matchMode) {
    let filters = {};
    filters.value = value;
    filters.matchMode = matchMode;
    return filters;
}
const PaginationUtils = {
    filters
}
export {
    PaginationUtils
}
