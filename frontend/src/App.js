import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import About from './containers/About';
import Contact from './containers/Contact';
import Materials from './containers/Materials';
import MaterialDetail from './containers/MaterialDetail';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import NotFound from './components/NotFound';
import Layout from './hocs/Layout';
import PrivateRoute from './components/privateRoute';

import { Provider } from 'react-redux';
import store from './store';


const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/materials' component={Materials} />
                    <PrivateRoute exact path='/materials/:id' component={MaterialDetail} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route component={NotFound} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;