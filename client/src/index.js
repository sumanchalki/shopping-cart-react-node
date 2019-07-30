import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './index.css';

import RootStoreProvider from './RootStoreProvider';
import BasePage from './components/pages/BasePage';
import SignOutPage from './components/pages/SignOutPage';

/*
 * BasePage is used to include Header, Footer etc.
 * With this we can skip header footer for any page to render directly.
 */
ReactDOM.render(
  <RootStoreProvider>
    <Switch>
      <Route exact path="/"
        render={routeProps => (<BasePage {...routeProps} pageName="Home" />)} />
      <Route path="/index.html"
        render={routeProps => (<BasePage {...routeProps} pageName="Home" />)} />
      <Route path="/shopping-cart"
        render={routeProps => (<BasePage {...routeProps} pageName="ShoppingCart" />)} />
      <Route path="/product-detail/:productId"
        render={routeProps => (<BasePage {...routeProps} pageName="ProductDetailsPage" />)} />
      <Route path="/sign-up"
        render={routeProps => (<BasePage {...routeProps} pageName="SignUpPage" />)} />
      <Route path="/sign-in"
        render={routeProps => (<BasePage {...routeProps} pageName="SignInPage" />)} />
      <Route path="/edit-profile"
        render={routeProps => (<BasePage {...routeProps} pageName="EditProfilePage" />)} />
      {/* signout page doesn't require any Header, Footer etc. */}
      <Route path="/signout" component={SignOutPage} />
      {/* <Route path="/sitemap.xml" component={Sitemap}/> */}
      <Route path="*"
        render={routeProps => (<BasePage {...routeProps} pageName="PageNotFound" />)} />
    </Switch>
  </RootStoreProvider>,
  document.getElementById('root')
);
