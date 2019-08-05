import React, { useState, useEffect } from 'react';
import './Home.css';
import ViewContainer from '../views/ViewContainer';
import UserMeta from '../user/UserMetaContainer';
import Constants from '../../../shared/constants';
import { getProfile, getMounts, getFactionName } from '../../../shared/utility';
import { Models } from '../../../shared/defaultData';
import Cookies from 'js-cookie';

const Home = () => {
  const [user, setUser] = useState(Models.user);
  const [allMounts, setAllMounts] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingMounts, setLoadingMounts] = useState(true);

  useEffect(() => {
    const userCache = localStorage.getItem(Constants.CACHE.USER_PROFILE_CACHE);
    const apiToken = Cookies.get(Constants.CACHE.BNET_API_KEY);

    const loadUser = () => {
      setLoadingUser(true);
      fetch(getProfile(apiToken))
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          const tempData = {
            profile: {
              name: resp.name,
              realm: resp.realm,
              faction: getFactionName(resp.faction)
            },
            mounts: resp.mounts
          };
          setUser(tempData);
          localStorage.setItem(
            Constants.CACHE.USER_PROFILE_CACHE,
            JSON.stringify(tempData)
          );
        });
      setLoadingUser(false);
    };

    if (!allMounts || allMounts.length === 0) {
      setLoadingMounts(true);
      fetch(getMounts())
        .then(resp => {
          return resp.json();
        })
        .then(resp => {
          setAllMounts(resp);
          setLoadingMounts(false);
        });
    }

    if (!userCache) {
      if (!apiToken) throw new Error('no api token found');
      loadUser();
    } else {
      setLoadingUser(true);
      setUser(JSON.parse(userCache));
      setLoadingUser(false);
    }
  }, [allMounts]);

  return (
    <>
      <UserMeta
        user={user}
        allMounts={allMounts || []}
        loadingUser={loadingUser}
        loadingMounts={loadingMounts}
      />
      <ViewContainer
        user={user}
        allMounts={allMounts || []}
        loading={loadingMounts}
      />
    </>
  );
};

export default Home;
