import React from 'react';

export default ({ input, label, className, type, meta: { touched, error } }) => (
  <React.Fragment>
    <div className="form-row">
      <div class="form-group col">
        <label htmlFor={input.name}>{label}</label>
      </div>
    </div>
    <div className="form-row">
      <div class="form-group col">
      <img src={input.value} alt={label} />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col">
        {/* input type="file" doesn’t support setting the value property from JS
            for security reason. To avoid this error value to be set as undefined.
        */}
        <input {...input} className={className} type={type} accept='.jpg, .png, .jpeg' value={undefined} />
          {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  </React.Fragment>
);
