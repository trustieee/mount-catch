import React, { useState } from 'react';
import './User.css';
import { MdViewList, MdGridOn, MdRefresh } from 'react-icons/md';

const User = ({ user }) => {
  const [isListDisplay, setIsListDiplay] = useState(true);

  const handleListClick = () => {
    if (isListDisplay) return;
    setIsListDiplay(true);
  };

  const handleGridClick = () => {
    if (!isListDisplay) return;
    setIsListDiplay(false);
  };

  const handleRefresh = e => {
    e.preventDefault();
  };

  if (
    !user ||
    !user.mounts ||
    !user.noMounts ||
    user.mounts.length === 0 ||
    user.noMounts.length === 0
  )
    return 'loading...';
  return (
    <>
      <div className="user-header-container">
        <div className="user-header-container-left">
          <h2>{user.name}</h2>
          <h4>{user.realm}</h4>
        </div>
        <div className="user-header-container-right">
          <h3>Collected {user.mounts.numCollected}</h3>
          <h3>Remaining {user.mounts.numNotCollected}</h3>
          <h5>
            Total: {user.mounts.numCollected + user.mounts.numNotCollected}
          </h5>
        </div>
      </div>

      <div className="table-header-container">
        <div className="table-header-container-left">
          <MdRefresh size="40" onClick={handleRefresh} />
        </div>
        <div className="table-header-container-right">
          <MdViewList
            className={isListDisplay ? 'active' : ''}
            size="40"
            color="#343a40"
            onClick={handleListClick}
          />
          <MdGridOn
            className={isListDisplay ? '' : 'active'}
            size="40"
            color="#343a40"
            onClick={handleGridClick}
          />
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Wowhead</th>
          </tr>
        </thead>
        <tbody>
          {user.mounts.collected.map((mount, i) => {
            return (
              <tr key={mount.spellId}>
                <td>{i}</td>
                <td>{mount.name}</td>
                <td>
                  <a
                    href={`https://www.wowhead.com/item=${mount.itemId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Wowhead</th>
          </tr>
        </thead>
        <tbody>
          {user.noMounts.map((mount, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{mount.name}</td>
                <td />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default User;
