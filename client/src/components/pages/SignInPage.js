import React, { Component } from 'react';
import SignIn from '../containers/SignIn';

export default class SignInPage extends Component {
  componentDidMount() {
    const { userData } = this.props.user;
    if (userData && Object.keys(userData).length) {
      // Redirect to home page.
      // Hitting back button should go back to the
      // earlier page in history instead of the login page.
      this.props.history.replace('/');
    }
  }
  render() {
    return(
      <div className="container main-container">
        <SignIn {...this.props}/>
      </div>
    )
  }
}
