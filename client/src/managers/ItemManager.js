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

export const updateItem = async (id, itemData) => {
    const response = await fetch(_apiUrl + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),

    });
}

export const deleteItem = async (id) => {
    const response = await fetch(_apiUrl + `/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
}