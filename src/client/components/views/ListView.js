import React from 'react';
import './ListView.css';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const ListView = ({ mounts, allMounts }) => {
  const alphabetical = (a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

  const [ownedFilter, setOwnedFilter] = React.useState(false);
  const [localMounts, setLocalMounts] = React.useState(
    allMounts.sort(alphabetical)
  );

  const ownsMount = name => mounts.findIndex(m => m.name === name) >= 0;

  const handleOwnedFilterClicked = () => {
    const showUnowned = !ownedFilter;
    setOwnedFilter(showUnowned);
    setLocalMounts(
      [...localMounts].sort((a, b) => {
        if (showUnowned) {
          return !ownsMount(a.name) && !ownsMount(b.name)
            ? 1
            : !ownsMount(a.name) && ownsMount(b.name)
            ? -1
            : ownsMount(a.name) && !ownsMount(b.name)
            ? 1
            : 0;
        } else {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
      })
    );
  };

  const ownsMountStyle = name => {
    return ownsMount(name)
      ? {
          textDecoration: 'line-through',
          color: 'green',
          backgroundColor: '#eee'
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
              Name{' '}
              {ownedFilter ? (
                <>
                  <MdArrowDropDown /> (unowned)
                </>
              ) : (
                <>
                  <MdArrowDropUp /> (alphabetical)
                </>
              )}
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
