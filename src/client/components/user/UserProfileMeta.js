import React from 'react';
import Loading from '../controls/Loading';
import PropTypes from 'prop-types';

const UserProfileMeta = ({ profile, loading }) => {
  if (loading) return <Loading />;

  return (
    <div className="user-profile-meta-container">
      <h2>{profile.name}</h2>
      <div>
        <span>{profile.realm}</span>
        <span className="separator">|</span>
        <span>{profile.faction}</span>
      </div>
    </div>
  );
};

UserProfileMeta.propTypes = {
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    realm: PropTypes.string.isRequired,
    faction: PropTypes.string.isRequired
  })
};

export default UserProfileMeta;
