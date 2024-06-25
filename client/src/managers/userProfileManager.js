const _apiUrl = "/api/UserProfile";

export const getUsers = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const getUsersById = (id) => {
    return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};