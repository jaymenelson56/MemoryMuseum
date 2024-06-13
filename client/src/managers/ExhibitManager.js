const _apiUrl = "/api/Exhibit";

export const getExhibits = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

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

export const deleteExhibit = async (id) => {
    const response = await fetch(_apiUrl + `/${id}`, {
        method:'DELETE'
    });
    if(!response.ok) {
        throw new Error("Failed to delete exhibit");
    }
}