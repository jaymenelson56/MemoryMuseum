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

export const promoteUser = (userId, id) => {
  return fetch(`${_apiUrl}/promote/${userId}?profileId=${id}`, {
    method: "Post",
  });
};

export const demoteUser = (userId, id) => {
  return fetch(`${_apiUrl}/demote/${userId}?adminId=${id}`, {
    method: "POST",
  });
};

export const requestUser = (userId, adminId) => {
  return fetch(`${_apiUrl}/${userId}/request?approverId=${adminId}`, {
    method: "PUT",
  });
};

export const denyUser = (userId) => {
  return fetch(`${_apiUrl}/${userId}/deny`, {
    method: "PUT",
  });
};