import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import Home from './components/Home';
import RegisterLogin from './components/RegisterLogin/index';
import Register from './components/RegisterLogin/Register';
import UserDashboard from './components/User/index';
import Shop from './components/Shop/index';
import AddProducts from './components/User/Admin/AddProducts';
import ManageCategories from './components/User/Admin/ManageCategories';
import Product from './components/Product/index';
import Cart from './components/User/Cart';
import UpdateProfile from './components/User/UpdateProfile';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/user/dashboard' exact component={Auth(UserDashboard, true)}/>
        <Route path='/user/cart' exact component={Auth(Cart, true)}/>
        <Route path='/user/profile' exact component={Auth(UpdateProfile, true)}/>
        <Route path='/admin/add_product' exact component={Auth(AddProducts, true)}/>
        <Route path='/admin/manage_categories' exact component={Auth(ManageCategories, true)}/>

        <Route path='/register' exact component={Auth(Register, false)}/>
        <Route path='/register_login' exact component={Auth(RegisterLogin, false)}/>
        
        <Route path='/shop' exact component={Auth(Shop, null)}/>
        <Route path='/product_detail/:id' exact component={Auth(Product, null)}/>
        <Route path='/' exact component={Auth(Home, null)}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
