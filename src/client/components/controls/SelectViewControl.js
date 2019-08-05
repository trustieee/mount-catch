import React from 'react';
import { MdGridOn, MdViewList } from 'react-icons/md';
import './SelectViewControl.css';
import './Controls.css';

const SelectViewControl = ({ onSelectViewClicked }) => {
  return (
    <div className="select-view-buttons-container">
      <MdViewList
        // className={isListDisplay ? 'active' : ''}
        size="40"
        color="#343a40"
        onClick={onSelectViewClicked}
      />
      <MdGridOn
        // className={isListDisplay ? '' : 'active'}
        size="40"
        color="#343a40"
        onClick={onSelectViewClicked}
      />
    </div>
  );
};

export default SelectViewControl;
