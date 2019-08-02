export default {
  CACHE: {
    USER_PROFILE_CACHE: 'MOUNTCATCH_USER_PROFILE_CACHE',
    MOUNT_CACHE: 'MOUNTCATCH_MOUNT_CACHE',
    BNET_API_KEY: 'MOUNTCATCH_BNET_API_KEY'
  },
  API: {
    getProfile: token => `/api/mounts/${token}`,
    getMounts: token => `/api/all-mounts/${token}`
  },
  Models: {
    user: {
      profile: {
        name: 'loading...',
        realm: 'loading...',
        faction: 0
      },
      mounts: {
        numCollected: 0,
        numNotCollected: 0,
        collected: [
          { name: 'loading...' },
          { name: 'loading...' },
          { name: 'loading...' }
        ]
      }
    },
    mounts: [
      { name: 'loading...' },
      { name: 'loading...' },
      { name: 'loading...' },
      { name: 'loading...' },
      { name: 'loading...' }
    ]
  }
};
