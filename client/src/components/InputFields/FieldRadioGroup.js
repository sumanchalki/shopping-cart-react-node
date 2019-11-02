import React from 'react';
import { Field } from 'redux-form';

export default ({
  input,
  label,
  options,
  className,
  meta: { touched, pristine, error }
}) => (
  <React.Fragment>
    <label htmlFor={input.name}>{label}</label>
    <div className="form-control">
      <Field
        component={({ input, options }) =>
          options.map(o => (
            <div key={o.value} className="form-check-inline">
              <label>
                <input
                  className={className}
                  type="radio"
                  name={input.name}
                  onChange={input.onChange}
                  value={o.value}
                  checked={o.value === input.value}
                />{' '}
                {o.title}
              </label>
            </div>
          ))
        }
        name={input.name}
        options={options}
      />
    </div>
    {touched && !pristine && error && (
      <span className="text-danger">{error}</span>
    )}
  </React.Fragment>
);
