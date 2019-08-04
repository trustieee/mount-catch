import React from 'react';

const ListView = ({ mounts }) => {
  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Wowhead</th>
            <th>Obtained By</th>
          </tr>
        </thead>
        <tbody>
          {mounts.map((mount, i) => {
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
                <td>foo</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
