import React from 'react';
import { MdGridOn, MdViewList } from 'react-icons/md';
import './SelectViewControl.css';
import './Controls.css';

const SelectViewControl = () => {
  return (
    <div className="select-view-buttons-container">
      <MdViewList
        // className={isListDisplay ? 'active' : ''}
        size="40"
        color="#343a40"
        onClick={() => console.log('list')}
      />
      <MdGridOn
        // className={isListDisplay ? '' : 'active'}
        size="40"
        color="#343a40"
        onClick={() => console.log('grid')}
      />
    </div>
  );
};

export default SelectViewControl;
