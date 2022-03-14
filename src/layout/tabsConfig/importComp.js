import React from 'react';
import Loadable from 'react-loadable';
const Loading = () => (<span>Loading...</span>);

export const Dashboard = Loadable({
    loader: () => import('@/views/dashboard/index.jsx'),
    loading: Loading,
    delay: 150
});
export const Menu = Loadable({
    loader: () => import('@/views/menu/index.jsx'),
    loading: Loading,
    delay: 150
});
export const Table = Loadable({
    loader: () => import('@/views/table/index.jsx'),
    loading: Loading,
    delay: 150
});
export const TableInfo = Loadable({
    loader: () => import('@/views/table/info/index.jsx'),
    loading: Loading,
    delay: 150
});
export const FormGenerator = Loadable({
    loader: () => import('@/views/form-generator/index.jsx'),
    loading: Loading,
    delay: 150
});
export const User = Loadable({
    loader: () => import('@/views/user/index.jsx'),
    loading: Loading,
    delay: 150
});
export const Icon = Loadable({
    loader: () => import('@/views/icon/index.jsx'),
    loading: Loading,
    delay: 150
});
export const Category = Loadable({
    loader: () => import('@/views/category/index.jsx'),
    loading: Loading,
    delay: 150
});
export const GoodsType = Loadable({
    loader: () => import('@/views/goods/goodsType/index.jsx'),
    loading: Loading,
    delay: 150
});
export const GoodsArgs = Loadable({
    loader: () => import('@/views/goods/goodsArgs/index.jsx'),
    loading: Loading,
    delay: 150
});
export const GoodsList = Loadable({
    loader: () => import('@/views/goods/goodsList/index.jsx'),
    loading: Loading,
    delay: 150
});
export const GoodsInfo = Loadable({
    loader: () => import('@/views/goods/goodsList/info/index.jsx'),
    loading: Loading,
    delay: 150
});
export const Role = Loadable({
    loader: () => import('@/views/role/index.jsx'),
    loading: Loading,
    delay: 150
});
