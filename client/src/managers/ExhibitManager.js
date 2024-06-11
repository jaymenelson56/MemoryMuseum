const _apiUrl = "/api/Exhibit";

export const getExhibitList = () => {
    return fetch(_apiUrl + "/details").then((res) => res.json());
};

export const getExhibit = async(id) => {
return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
}