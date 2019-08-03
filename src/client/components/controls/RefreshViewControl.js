import React from 'react';
import { MdRefresh } from 'react-icons/md';
import './RefreshViewControl.css';
import './Controls.css';

const RefreshViewControl = () => {
  return <MdRefresh size="40" onClick={() => console.log('refresh')} />;
};

export default RefreshViewControl;
