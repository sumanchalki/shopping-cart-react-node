import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import _ from 'lodash';
import * as actions from '../../actions';
import { displayMessage } from '../../lib/cartLib';

// TODO: to move form fields inside directory InputFields.
const renderInputField = ({ input, label, className, type, meta: { touched, error } }) => (
  <React.Fragment>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} className={className} type={type} />
      {touched && error && <span className="text-danger">{error}</span>}
  </React.Fragment>
);

const renderFileInputField = ({ input, label, className, type, meta: { touched, error } }) => (
  <React.Fragment>
    <label htmlFor={input.name}>{label}</label>
    {/* input type="file" doesn’t support setting the value property from JS
        for security reason. To avoid this error value to be set as null.
    */}
    <input {...input} className={className} type={type} accept='.jpg, .png, .jpeg' value={null} />
      {touched && error && <span className="text-danger">{error}</span>}
  </React.Fragment>
);

// TODO: to move form fields inside directory InputFields.
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
);

class EditProfile extends Component {
  onSubmitHandler = formProps => {
    // Along with formProps pass the current userid to thunk middleware
    return this.props.editProfile(formProps, this.props.initialValues).then(response => {
      if (response.success) {
        displayMessage('You have updated your profile successfully.', 'success');
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
        throw new SubmissionError({ _error: 'Edit profile failed due to some server error!' });
      }
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, error } = this.props;
    return(
      <form id="edit-profile-form" onSubmit={handleSubmit(this.onSubmitHandler)} className="needs-validation" encType="multipart/form-data">
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
          <Field name="picture" label="Photo" type="file" className="form-control" component={renderFileInputField} />
        </div>
        <div className="form-group">
          <Field name="gender" label="Gender" className="form-check-input"
            component={renderRadioGroup} options={ [
              { title: 'Male', value: 'male' },
              { title: 'Female', value: 'female' }
          ] } />
        </div>
        <button type="submit" className="btn btn-primary mr-3" disabled={pristine || submitting}>Update</button>
        <button type="button" className="btn btn-primary" disabled={pristine || submitting} onClick={reset}>Reset</button>
      </form>
    );
  }
}

// Also add client-side validation.
const validateEditProfileForm = values => {
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
};

const mapStateToProps = state => {
  if (!_.isEmpty(state.user.userData)) {
    // Need to change to key from firstName to firstname etc.
    const userData = _.omit(state.user.userData, ['firstName', 'lastName']);
    return {
      initialValues:
        {
          ...userData,
          firstname: state.user.userData.firstName,
          lastname: state.user.userData.lastName
        }
    };
  }
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'editprofile', validate: validateEditProfileForm, enableReinitialize: true })
)(EditProfile);
