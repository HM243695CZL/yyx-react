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
