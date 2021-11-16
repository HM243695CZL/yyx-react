import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import {CacheRoute, CacheSwitch} from 'react-router-cache-route';
import {Modal, Button} from 'antd';
import cx from 'classnames';
import {routes} from '@/router';
import {getMenu} from '@/utils';


const AppMain = props =>{
    const {theme, location} = props;
    const classnames = cx('app-main-container', {
        'fixedHeader': theme.layout.includes('fixedHeader'),
        'index-page': location.pathname === '/dashboard'
    });
    const [isShow, setShow] = useState(true);
    const clickConfirm = () => {
        const {history} = props;
        setShow(false);
        history.replace('/login');
    };
    if(!getMenu()) {
        return (
            <Modal
                title='【提示信息】'
                visible={isShow}
                onOk={e => clickConfirm()}
                maskClosable={false}
                footer={[
                    <Button key="back" type='primary' onClick={e => clickConfirm()}>
                        前往登录
                    </Button>
                ]}
            >
                您的登录信息已失效，请重新登录
            </Modal>
        )
    }
    return (
        <div className={classnames}>
            <CacheSwitch>
                {
                    routes.map(ele => {
                        if(ele.keepAlive || ele.isDynamic) {
                            return <CacheRoute
                                when='always'
                                exact={true}
                                component={ele.component}
                                key={ele.path}
                                cacheKey={ele.path}
                                path={ele.path}
                                multiple={true}
                            />
                        }
                        return <Route
                            exact={true}
                            component={ele.component}
                            key={ele.path}
                            path={ele.path}
                        />
                    })
                }
            </CacheSwitch>
        </div>
    )
};

export default withRouter(connect(null, null)(AppMain))
