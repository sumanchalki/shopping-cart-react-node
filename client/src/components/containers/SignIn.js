import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../../actions';

const renderInputField = ({ input, label, className, type, meta: { touched, error } }) => (
  <React.Fragment>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} className={className} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
  </React.Fragment>
)

class SignIn extends Component {
  onSubmitHandler = formProps => {
    return this.props.signIn(formProps).then(response => {
      if (response.success) {
        console.log(response);
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
      <form onSubmit={handleSubmit(this.onSubmitHandler)}>
        {error &&
          <div className="alert alert-danger">
            <strong>Error!</strong> {error}
          </div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" className="form-control" component={renderInputField} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" className="form-control" component={renderInputField} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Sign In</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'signin' })
)(SignIn);
