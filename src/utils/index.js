function getToken() {
    return localStorage.getItem('token')
}

function getMenu() {
    return localStorage.getItem('menu')
}

function setToken(token) {
    return localStorage.setItem('token', token)
}

function setMenu(menu) {
    return localStorage.setItem('menu', menu)
}

function removeMenu() {
    localStorage.removeItem('menu')
}
// 将平面json格式转为树状json格式
function arrayToTree (data, id, pid) {
    if (!data || !data.length) return []
    let targetData = []
    let records = {}
    let itemLength = data.length
    for (let i = 0; i < itemLength; i++) {
        let o = data[i]
        records[o[id]] = o
    }
    for (let j = 0; j < itemLength; j++) {
        let currentData = data[j]
        let parentData = records[currentData[pid]]
        if (!parentData) {
            targetData.push(currentData)
            continue
        }
        parentData.children = parentData.children || []
        parentData.children.push(currentData)
    }
    return targetData
}

function objectArraySort(key) {
    return function (objN, objM) {
        let valueN = objN[key];
        let valueM = objM[key];
        if(valueN < valueM) return -1;
        else if(valueN > valueM) return 1;
        else return 0
    }
}

function removeToken() {
    localStorage.removeItem('token')
}

export {
    getToken,
    setToken,
    getMenu,
    setMenu,
    removeToken,
    removeMenu,
    arrayToTree,
    objectArraySort
}
