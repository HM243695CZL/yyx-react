import React from 'react';
import {
    Dashboard, Menu, Table, TableInfo, FormGenerator, User,
    Icon, Category, GoodsType, GoodsArgs
} from './importComp'

export const getTabsComponent = key => {
    let newKey = key;
    if (key.includes('?')) {
        newKey = key.split('?')[0]
    }
    const tab = {
        title: 'not found',
        component: 'not found'
    };
    /**
     * 注：这里只能通过switch的方式切换组件，才能缓存输入的数据
     *  不能通过obj[key] = <Component/> 的方式
     */
    switch (newKey) {
        case '/':
            tab.component = <Dashboard />;
            break;
        case '/dashboard':
            tab.component = <Dashboard />;
            break;
        case '/menu':
            tab.component = <Menu />;
            break;
        case '/table':
            tab.component = <Table />;
            break;
        case '/table-info':
            tab.component = <TableInfo />;
            break;
        case '/form-generator':
            tab.component = <FormGenerator />;
            break;
        case '/user':
            tab.component = <User />;
            break;
        case '/icon':
            tab.component = <Icon />;
            break;
        case '/category':
            tab.component = <Category />;
            break;
        case '/goods/goodsType':
            tab.component = <GoodsType />;
            break;
        case '/goods/goodsArgs':
            tab.component = <GoodsArgs />;
            break;
        default:
            break;
    }
    return tab;
};
