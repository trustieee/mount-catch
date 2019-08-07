import React from 'react';
import ReactTooltip from 'react-tooltip';
import './GridView.css';

const GridView = ({ mounts, allMounts }) => {
  const ownsMount = name => mounts.findIndex(m => m.name === name) >= 0;

  return (
    <div className="grid-view-container">
      {allMounts.map(m => (
        <div key={m.name} className="grid-view-mount-item">
          {m.icon ? (
            <>
              <img
                data-tip={m.name}
                data-for="main"
                className={
                  ownsMount(m.name) ? 'grid-view-mount-item-owned' : null
                }
                alt="icon"
                src={`https://wow.zamimg.com/images/wow/icons/medium/${
                  m.icon
                }.jpg`}
              />
            </>
          ) : (
            'n/a'
          )}
        </div>
      ))}
      <ReactTooltip
        id="main"
        place="top"
        type="dark"
        effect="float"
        delayHide={1000}
      />
    </div>
  );
};

export default GridView;
