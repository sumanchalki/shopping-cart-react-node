import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';
import renderInputField from '../InputFields/FieldInput';

class SignIn extends Component {
  onSubmitHandler = formProps => {
    // Promisify the form submit action dispatch, so that
    // it will be returned with response from saga and
    // it can be handled here with finer control.
    return new Promise((resolve, reject) => {
      // As mapDispatchToProps is not a function, return the object.
      // Redux will do the dispatching automatically.
      return this.props.signIn(formProps, resolve, reject);
    })
      .then(response => {
        this.props.reset();
        this.props.history.push('/');
      })
      .catch(response => {
        if (
          response &&
          !response.success &&
          typeof response.errors !== 'undefined' &&
          Object.keys(response.errors).length
        ) {
          const errorsList = { ...response.errors };
          if (typeof errorsList.form === 'undefined') {
            throw new SubmissionError(errorsList);
          } else {
            const formError = errorsList.form;
            delete errorsList.form;
            throw new SubmissionError({ _error: formError, ...errorsList });
          }
        } else {
          throw new SubmissionError({
            _error: 'Sign-in failed due to server error!'
          });
        }
      });
  };

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmitHandler)}>
        {error && (
          <div className="alert alert-danger">
            <strong>Error!</strong> {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          Sign In
        </button>
      </form>
    );
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: 'signin' })
)(SignIn);
