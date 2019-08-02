import React from 'react';
import Loading from '../controls/Loading';
import PropTypes from 'prop-types';

const UserMountMeta = ({ mounts, allMounts, loading }) => {
  if (loading) return <Loading />;

  return (
    <div className="user-mount-meta-container">
      <span className="user-mount-meta-owned">{mounts.numCollected}</span>
      <span className="separator">|</span>
      <span className="user-mount-meta-total">{allMounts.length}</span>
    </div>
  );
};

UserMountMeta.propTypes = {
  loading: PropTypes.bool.isRequired,
  allMounts: PropTypes.array.isRequired,
  mounts: PropTypes.shape({
    numCollected: PropTypes.number.isRequired
  })
};

export default UserMountMeta;
