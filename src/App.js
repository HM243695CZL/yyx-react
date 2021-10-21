import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from '@/layout';
import Login from '@/views/login'
import store from '@/store'

class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route
                            component={Login}
                            exact
                            path='/login'
                        />
                        <Route
                            component={Layout}
                            path='/'
                        />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}


export default App;
