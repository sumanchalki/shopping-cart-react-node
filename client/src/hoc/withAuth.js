/**
 * This file contains hoc to provide auth related functions e.g. isAuthenticated()
 * to any component by accessing the store.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthContext } from '../contexts/AuthContext';

export default WrappedComponent => {
  class AuthComponent extends Component {
    isAuthenticated = () => {
      const { userData } = this.props.user;
      if (typeof(userData) !== 'undefined' && userData && Object.keys(userData).length) {
        return true;
      }
      return false;
    }
    render() {
      return (
        <AuthContext.Provider value={{ isAuthenticated: this.isAuthenticated }}>
          <WrappedComponent { ...this.props }/>
        </AuthContext.Provider>
      );
    }
  }

  const mapStateToProps = state => {
    return { user: state.user };
  }

  return connect(mapStateToProps, null)(AuthComponent);
}
