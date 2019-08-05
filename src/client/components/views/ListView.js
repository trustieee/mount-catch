import React from 'react';
import './ListView.css';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const ListView = ({ mounts, allMounts }) => {
  const [ownedFilter, setOwnedFilter] = React.useState(false);
  const [localMounts, setLocalMounts] = React.useState(allMounts);

  const ownsMount = name => mounts.findIndex(m => m.name === name) >= 0;

  const handleOwnedFilterClicked = () => {
    setOwnedFilter(!ownedFilter);
    // sort mounts here
  };

  const ownsMountStyle = name => {
    return ownsMount(name)
      ? {
          textDecoration: 'line-through',
          color: 'green'
        }
      : null;
  };

  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th
              className="list-view-table-header-name"
              onClick={handleOwnedFilterClicked}
            >
              Name {ownedFilter ? <MdArrowDropDown /> : <MdArrowDropUp />}
            </th>
            <th>Obtained By</th>
            <th>Wowhead</th>
          </tr>
        </thead>
        <tbody>
          {localMounts.map((mount, i) => {
            return (
              <tr key={i} style={ownsMountStyle(mount.name)}>
                <td>{i + 1}</td>
                <td>{mount.name}</td>
                <td>
                  {localMounts.find(m => m.name === mount.name).sourceName ||
                    'n/a'}
                </td>
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
    </div>
  );
};

export default ListView;
