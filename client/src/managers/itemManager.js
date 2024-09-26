const _apiUrl = "/api/Item";

export const newItem = async (itemData) => {
    const response = await fetch(_apiUrl, {
        method: 'POST',
        body: itemData
    });
    const data = await response.json();
    return data
}

export const getItem = async (id) => {
    return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const updateItem = async (id, itemData) => {
    return fetch(_apiUrl + `/${id}`, {
        method: "PUT",
        body: itemData,
    }).then((res) => res.json());
}

export const deleteItem = async (id) => {
    const response = await fetch(_apiUrl + `/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete comment');
    }
}

export const getPendingItems = async (id) => {
    return await fetch(_apiUrl + `/needing-approval/${id}`).then((res) => res.json());
};

export const getRejectedItems = async (id) => {
    return await fetch(_apiUrl + `/rejected/${id}`).then((res) => res.json());
};

export const getNotApprovedItems = async (id) => {
    return await fetch(_apiUrl + `/not-approved/${id}`).then((res) => res.json());
};

export const approveItem = async (id) => {
    const response = await fetch(_apiUrl + `/approve/${id}`, {
        method: 'PUT'
    });
    if (!response.ok) {
        throw new Error('Failed to approve item');
    }
    return response.ok;
};

export const rejectItem = async (id) => {
    const response = await fetch(_apiUrl + `/reject/${id}`, {
        method: 'PUT'
    });
    if (!response.ok) {
        throw new Error('Failed to reject item');
    }
    return response.ok;
};