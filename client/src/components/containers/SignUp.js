import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';

class SignUp extends Component {
  onSubmitHandler = formProps => {
    console.log(formProps);
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmitHandler)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password" component="input" />
        </fieldset>
        <button>Sign Up</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup' })
)(SignUp);
