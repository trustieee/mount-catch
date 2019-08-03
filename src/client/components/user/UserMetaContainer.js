import React from 'react';
import UserProfileMeta from './UserProfileMeta';
import UserMountMeta from './UserMountMeta';
import './UserMetaContainer.css';
import PropTypes from 'prop-types';

const UserMeta = ({ user, loadingUser, loadingMounts, allMounts }) => (
  <div className="user-meta-container">
    <UserProfileMeta profile={user.profile} loading={loadingUser} />
    <UserMountMeta
      mounts={user.mounts}
      allMounts={allMounts}
      loading={loadingMounts}
    />
  </div>
);

UserMeta.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.object.isRequired,
    mounts: PropTypes.object.isRequired
  }),
  loadingUser: PropTypes.bool.isRequired,
  loadingMounts: PropTypes.bool.isRequired,
  allMounts: PropTypes.array.isRequired
};

export default UserMeta;
