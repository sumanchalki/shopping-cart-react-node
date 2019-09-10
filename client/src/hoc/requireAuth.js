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
      const { userData } = this.props.user;
      if (!userData || !Object.keys(userData).length) {
        // Redirect to sign-in page.
        // Hitting back button should go back to the
        // earlier page in history instead of the protected page.
        this.props.history.replace('/sign-in');
      }
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
