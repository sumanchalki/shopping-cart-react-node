import React, { Component } from 'react';

export default class FileInputField  extends Component {
  constructor(props) {
    super(props);
    this.originalFile = '';
  }

  render() {
    const { input, label, className, type, meta: { touched, error } } = this.props;
    return (
      <React.Fragment>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor={input.name}>{label}</label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            {
              (()=>{
                if (typeof input.value === 'string') {
                  // When the image is being displayed from DB.
                  this.originalFile = input.value;
                  return <img id="edit-profile-image" src={input.value} alt={label} className="permanent" />
                }
                else if (input.value && input.value.length) {
                  // When the image is being displayed what user has selected.
                  const reader = new FileReader();

                  reader.onload = function (e) {
                    // Render thumbnail.
                    document.getElementById("edit-profile-image").src = e.target.result;
                  };

                  // Read the image file as a data URL.
                  reader.readAsDataURL(input.value[0]);

                  return <img id="edit-profile-image" alt={label} className="temporary" />
                }
                else if (this.originalFile) {
                  // When user cancelled her selection.
                  return <img id="edit-profile-image" src={this.originalFile} alt={label} className="permanent" />
                }
              })()
            }
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
  }
}
