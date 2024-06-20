const _apiUrl = "/api/UserProfile";

export const getUsers = () => {
    return fetch(_apiUrl).then((res) => res.json());
};