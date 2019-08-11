import React, {Component} from 'react';

export default class FieldFileInput  extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { input: { value } } = this.props;
    // The props sent to the component from redux-form Field
    const { input,label, required, meta, } = this.props;
    return (
      <div><label>{label}</label>
        <div>
          <input type='file' accept='.jpg, .png, .jpeg' onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
