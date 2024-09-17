const _apiUrl = "/api/Report";

export const getReports = () => {
  return fetch(_apiUrl);
};

export const getReport = async (id) => {
  return await fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const newReport = async (reportData) => {
  const response = await fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportData),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const closeReport = async (id) => {
  const response = await fetch(`${_apiUrl}/${id}/close`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to close the report. Please try again.");
  }

  return response;
};

export const deleteReport = async (id) => {
  const response = await fetch(_apiUrl + `/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorDetails = `Status: ${response.status}, Message: ${response.statusText}`;
    console.error("Failed to delete report:", errorDetails);
    throw new Error(`Failed to delete report. ${errorDetails}`);
  }

  return response; // Return the response, even if it's 204 No Content
};
