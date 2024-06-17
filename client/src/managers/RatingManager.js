const _apiUrl = "/api/Rating";

export const getRatings = () => {
    return fetch(_apiUrl).then((res) => res.json());
};