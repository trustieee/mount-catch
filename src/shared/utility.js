export const getProfile = token => `/api/mounts/${token}`;
export const getMounts = token => `/api/all-mounts/${token}`;
export const getFactionName = factionId => {
  switch (factionId) {
    case 0:
      return 'Alliance';
    case 1:
    default:
      return 'Horde';
  }
};
