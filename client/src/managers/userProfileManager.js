const _apiUrl = "/api/UserProfile";

export const getUsers = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getInactiveUsers = () => {
  return fetch(_apiUrl + "/InactiveUsers").then((res) => res.json());
};

export const getUsersById = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const toggleUserIsActive = (id) => {
  return fetch(`${_apiUrl}/ToggleIsActive/${id}`, {
    method: "PUT",
  }).then((res) => res.json());
};
