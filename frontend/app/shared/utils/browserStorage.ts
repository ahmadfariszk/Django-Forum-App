export const getAccessToken = (
  localStorage: Storage,
  sessionStorage: Storage
) => {
  const accessToken = sessionStorage.getItem("access_token")
    ? sessionStorage.getItem("access_token")
    : localStorage.getItem("access_token");
  return accessToken ?? "";
};
