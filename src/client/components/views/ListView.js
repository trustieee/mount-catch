import React from 'react';

const ListView = ({ mounts, allMounts }) => {
  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Obtained By</th>
            <th>Wowhead</th>
          </tr>
        </thead>
        <tbody>
          {mounts.map((mount, i) => {
            return (
              <tr key={mount.spellId}>
                <td>{i}</td>
                <td>{mount.name}</td>
                <td>
                  {allMounts.find(m => m.name === mount.name).sourceName ||
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
