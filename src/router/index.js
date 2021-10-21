import React from 'react';
import loadable from '@loadable/component';
import {getMenu} from '@/utils';
import {dynamicRouter} from '@/router/dynamic-router';

const _import  = require('./import_comp');

// 获取views目录下的所有.jsx文件的路径
const viewFile = require.context('../views', true, /\.jsx$/);
let viewPath = viewFile.keys().map(modulePath => {
    // modulePath = './chart/line/index.jsx'
    return modulePath.slice(1).split('.')[0].slice(0, (modulePath.slice(1).split('.')[0].length - 6));
});

let tempArr = [];
(JSON.parse(getMenu())|| []).map(item => {
    if(item.children && item.children.length) {
        item.children.map(ele => {
            tempArr.push(ele)
        })
    } else {
        tempArr.push(item)
    }
});
tempArr = [...tempArr, ...dynamicRouter];
let routes = tempArr.map(router => {
    if(viewPath.includes(router.path)) {
        router = {
            ...router,
            component: loadable(_import(router.path))
        };
    } else {
        router = {
            ...router,
            component: loadable(_import('/error'))
        };
    }

    return router
});
export {
    routes
}

