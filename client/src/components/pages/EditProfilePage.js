import React, { Component } from 'react';
import EditProfile from '../containers/EditProfile';
import requireAuth from '../../hoc/requireAuth';

class EditProfilePage extends Component {
  render() {
    return(
      <div className="container main-container">
        <EditProfile {...this.props} />
      </div>
    )
  }
}

export default requireAuth(EditProfilePage);
