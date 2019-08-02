import React, { useState, useEffect } from 'react';
import * as Cookies from 'js-cookie';
import User from './User';

const Home = () => {
  const [user, setUser] = useState({
    name: 'loading...',
    realm: 'loading...',
    mounts: [],
    noMounts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mountsCache = localStorage.getItem('MOUNTCATCH_MOUNT_CACHE');
    const noMountsCache = localStorage.getItem('MOUNTCATCH_NOMOUNT_CACHE');
    if (!mountsCache || !noMountsCache) {
      const token = Cookies.get('MOUNTCATCH_BNET_API_KEY');
      if (!token) return;
      fetch(`/api/mounts/${token}`)
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          setUser({
            name: resp.name,
            realm: resp.realm,
            mounts: resp.mounts
          });
          localStorage.setItem('MOUNTCATCH_MOUNT_CACHE', JSON.stringify(resp));
        })
        .then(
          fetch(`/api/all-mounts/${token}`)
            .then(resp => {
              return resp.json();
            })
            .then(resp => {
              setUser({ notMounts: resp.mounts });
              localStorage.setItem(
                'MOUNTCATCH_NOMOUNT_CACHE',
                JSON.stringify(resp)
              );
              setLoading(false);
            })
        );
    } else {
      const parsedMountsCache = JSON.parse(mountsCache);
      const parsedNoMountsCache = JSON.parse(noMountsCache);
      setUser({
        name: parsedMountsCache.name,
        realm: parsedMountsCache.realm,
        mounts: parsedMountsCache.mounts,
        noMounts: parsedNoMountsCache.mounts
      });
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {(!user ||
        !user.name ||
        (user.mounts && user.mounts.length === 0) ||
        (user.noMounts && user.noMounts.length === 0)) && (
        <a href="http://localhost:3001/api/auth/bnet">login</a>
      )}
      {!loading && <User user={user} />}
    </div>
  );
};

export default Home;
