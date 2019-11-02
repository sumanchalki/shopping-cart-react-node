import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';
import { displayMessage } from '../../lib/cartLib';
import renderInputField from '../InputFields/FieldInput';
import renderRadioGroup from '../InputFields/FieldRadioGroup';

class SignUp extends Component {
  onSubmitHandler = formProps => {
    // Promisify the form submit action dispatch, so that
    // it will be returned with response from saga and
    // it can be handled here with finer control.
    return new Promise((resolve, reject) => {
      // As mapDispatchToProps is not a function, return the object.
      // Redux will do the dispatching automatically.
      return this.props.signUp(formProps, resolve, reject);
    })
      .then(response => {
        displayMessage('You have been signed up successfully.', 'success');
        this.props.reset();
      })
      .catch(response => {
        if (
          response &&
          !response.success &&
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
            _error: 'Signup failed due to server error!'
          });
        }
      });
  };

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmitHandler)}
        className="needs-validation">
        {error && (
          <div className="alert alert-danger">
            <strong>Error!</strong> {error}
          </div>
        )}
        <div className="form-group">
          <Field
            name="firstname"
            label="First Name"
            type="text"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <Field
            name="lastname"
            label="Last Name"
            type="text"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <Field
            name="gender"
            label="Gender"
            className="form-check-input"
            component={renderRadioGroup}
            options={[
              { title: 'Male', value: 'male' },
              { title: 'Female', value: 'female' }
            ]}
          />
        </div>
        <div className="form-group">
          <Field
            name="address"
            label="Address"
            type="textarea"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <Field
            name="email"
            label="Email"
            type="email"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <div className="form-group">
          <Field
            name="password"
            label="Password"
            type="password"
            className="form-control"
            component={renderInputField}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          Sign Up
        </button>
      </form>
    );
  }
}

// Also add client-side validation.
// TODO: Add a Field prop "required" for validation.
// Also use the same attribute to display (*).
const validateSignUpForm = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'First Name is required.';
  }
  if (!values.lastname) {
    errors.lastname = 'Last Name is required.';
  }
  if (!values.gender) {
    errors.gender = 'Gender is required.';
  }
  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  }
  return errors;
};

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: 'signup', validate: validateSignUpForm })
)(SignUp);
