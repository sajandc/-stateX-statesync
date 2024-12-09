export const onLogin = (username, password) => ({
  type: "ON_LOGIN",
  payload: { username, password },
});

export const onLogout = (username, password) => ({
  type: "ON_LOGOUT",
  payload: {},
});
