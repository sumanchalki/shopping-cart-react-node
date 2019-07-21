import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';
import { displayMessage } from '../../lib/cartLib';

const renderInputField = ({ input, label, className, type, meta: { touched, error } }) => (
  <React.Fragment>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} className={className} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
  </React.Fragment>
)

const renderRadioGroup = ({ input, label, options, className, meta: { touched, pristine, error } }) => (
  <React.Fragment>
    <label htmlFor={input.name}>{label}</label>
    <div className="form-control">
      <Field
        component={({ input, options }) => (
          options.map(o =>
          <div key={o.value} className="form-check-inline">
            <label>
              <input className={className} type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}
            </label>
          </div>)
          )}
        name={input.name}
        options={options}
      />
    </div>
    {touched && !pristine && error && <span className="text-danger">{error}</span>}
  </React.Fragment>
)

class SignUp extends Component {
  onSubmitHandler = formProps => {
    return this.props.signUp(formProps).then(response => {
      if (response.success) {
        displayMessage('You have been signed up successfully.', 'success');
        this.props.reset();
      }
      else if (!response.success && Object.keys(response.errors).length) {
        const errorsList = {...response.errors};
        if (typeof(errorsList.form) === 'undefined') {
          throw new SubmissionError(errorsList);
        }
        else {
          const formError = errorsList.form;
          delete errorsList.form;
          throw new SubmissionError({ _error: formError, ...errorsList });
        }
      }
      else {
        throw new SubmissionError({ _error: 'Signup failed due to some server error!' });
      }
    });
  }
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmitHandler)} className="needs-validation">
        {error &&
          <div className="alert alert-danger">
            <strong>Error!</strong> {error}
          </div>}
        <div className="form-group">
          <Field name="firstname" label="First Name" type="text" className="form-control" component={renderInputField} />
        </div>
        <div className="form-group">
          <Field name="lastname" label="Last Name" type="text" className="form-control" component={renderInputField} />
        </div>
        <div className="form-group">
          <Field name="gender" label="Gender" className="form-check-input"
            component={renderRadioGroup} options={ [
              { title: 'Male', value: 'male' },
              { title: 'Female', value: 'female' }
          ] } />
          {/* <label htmlFor="gender">Gender</label>
          <div className="form-control">
            <div className="form-check-inline">
              <label className="form-check-label">
                <Field name="gender" type="radio" className="form-check-input" component="input" value="male" /> Male
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
              <Field name="gender" type="radio" className="form-check-input" component="input" value="female" /> Female
              </label>
            </div>
          </div> */}
        </div>
        <div className="form-group">
          <Field name="email" label="Email" type="email" className="form-control" component={renderInputField} />
        </div>
        <div className="form-group">
          <Field name="password" label="Password" type="password" className="form-control" component={renderInputField} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Sign Up</button>
      </form>
    );
  }
}

// Also add client-side validation.
const validateSignUpForm = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'First Name is required.'
  }
  if (!values.lastname) {
    errors.lastname = 'Last Name is required.'
  }
  if (!values.gender) {
    errors.gender = 'Gender is required.'
  }
  if (!values.email) {
    errors.email = 'Email is required.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!'
  }
  if (!values.password) {
    errors.password = 'Password is required.'
  }
  return errors;
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signup', validate: validateSignUpForm })
)(SignUp);
