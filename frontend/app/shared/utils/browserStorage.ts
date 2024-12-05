export const getAccessToken = (
  localStorage: Storage,
  sessionStorage: Storage
) => {
  const accessToken = sessionStorage.getItem("access_token")
    ? sessionStorage.getItem("access_token")
    : localStorage.getItem("access_token");
  return accessToken ?? "";
};

export const removeAccessToken = (
  localStorage: Storage,
  sessionStorage: Storage
) => {
  sessionStorage.removeItem("access_token")
  localStorage.removeItem("access_token");
};
