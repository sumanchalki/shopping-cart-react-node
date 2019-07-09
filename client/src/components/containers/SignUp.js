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
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <Field name="firstname" type="text" className="form-control" component="input" />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <Field name="lastname" type="text" className="form-control" component="input" />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Gender</label>
          <div className="form-control">
            <div className="form-check-inline">
              <label className="form-check-label">
                <Field name="gender" type="radio" className="form-check-input" component="input" /> Male
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
              <Field name="gender" type="radio" className="form-check-input" component="input" /> Female
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" className="form-control" component="input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" className="form-control" component="input" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup' })
)(SignUp);
