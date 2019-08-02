import React, { useState } from 'react';
import ListView from './ListView';
import GridView from './GridView';
import SelectViewControl from '../controls/SelectViewControl';
import RefreshViewControl from '../controls/RefreshViewControl';
import Loading from '../controls/Loading';
import './UserMountView.css';
import PropTypes from 'prop-types';

const UserMountView = ({ user, allMounts, loading }) => {
  const [isListView, setIsListView] = useState(true);
  return (
    <>
      <div className="user-mount-view-ribbon-container">
        <RefreshViewControl />
        <SelectViewControl />
      </div>
      <div className="user-mount-view-content-container">
        {loading ? <Loading /> : isListView ? <ListView /> : <GridView />}
      </div>
    </>
  );
};

UserMountView.propTypes = {
  user: PropTypes.object.isRequired,
  allMounts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default UserMountView;
