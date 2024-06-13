const _apiUrl = "/api/Item";

export const newItem = async (exhibit) => {
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

export const getItem = async (id) => {
    return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
};