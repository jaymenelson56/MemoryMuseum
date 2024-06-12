const _apiUrl = "/api/Exhibit";

export const getExhibitList = () => {
    return fetch(_apiUrl + "/details").then((res) => res.json());
};

export const getExhibit = async (id) => {
    return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const newExhibit = async (exhibit) => {
    const response = await fetch(_apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exhibit)
    });

    const data = await response.json();
    return data
}