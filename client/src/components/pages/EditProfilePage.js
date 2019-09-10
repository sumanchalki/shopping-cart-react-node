import React, { Component } from 'react';
import EditProfile from '../containers/EditProfile';
import requireAuth from '../../hoc/requireAuth';

class EditProfilePage extends Component {
  render() {
    return(
      <div className="container main-container">
        <EditProfile />
      </div>
    )
  }
}

export default requireAuth(EditProfilePage);
