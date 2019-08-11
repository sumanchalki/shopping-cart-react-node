import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';

class SignOutPage extends Component {
  componentDidMount() {
    // As we shouldn't update state during an existing
    // state transition (such as within `render`).
    this.props.signOut();
  }
  render() {
    return <Redirect to='/' />;
  }
}

export default connect(null, actions)(SignOutPage);
