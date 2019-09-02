import React, { Component } from 'react';
import { connect } from 'react-redux';

export default WrappedComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.navigateToLogin();
    }

    componentDidUpdate() {
      this.navigateToLogin();
    }

    navigateToLogin() {
      // TODO: to check authentication from redux store and then redirect if not authenticated.
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { state };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
