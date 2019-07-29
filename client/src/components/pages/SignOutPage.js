import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';

class SignOutPage extends Component {
  render() {
    this.props.signOut();
    return <Redirect to='/' />;
  }
}

export default connect(null, actions)(SignOutPage);
