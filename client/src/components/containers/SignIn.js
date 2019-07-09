import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';

class SignIn extends Component {
  onSubmitHandler = formProps => {
    console.log(formProps);
  }
  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmitHandler)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" className="form-control" component="input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" className="form-control" component="input" />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signin' })
)(SignIn);
