import React, { useState } from 'react';
import ListView from './ListView';
import GridView from './GridView';
import SelectViewControl from '../controls/SelectViewControl';
import RefreshViewControl from '../controls/RefreshViewControl';
import Loading from '../controls/Loading';
import './ViewContainer.css';
import PropTypes from 'prop-types';

const ViewContainer = ({ user, allMounts, loading }) => {
  const [isListView, setIsListView] = useState(true);
  return (
    <>
      <div className="user-mount-view-ribbon-container">
        <RefreshViewControl />
        <SelectViewControl />
      </div>
      <div className="user-mount-view-content-container">
        {loading ? (
          <Loading />
        ) : isListView ? (
          <ListView mounts={user.mounts.collected} allMounts={allMounts} />
        ) : (
          <GridView mounts={user.mounts.collected} />
        )}
      </div>
    </>
  );
};

ViewContainer.propTypes = {
  user: PropTypes.shape({
    mounts: PropTypes.shape({
      collected: PropTypes.array.isRequired
    }).isRequired
  }).isRequired,
  allMounts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ViewContainer;
