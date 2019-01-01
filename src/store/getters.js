const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  deviceInfo: state => state.user.deviceInfo,
  showSide:state => state.user.showSide,
  language: state => state.app.language,
  device: state => state.app.device,
};
export default getters
