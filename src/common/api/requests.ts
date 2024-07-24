export const handleResponse = async (response: Response) => {
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error);
	}
	return response.json();
};

export const patchRequest = async (url: string) => {
	const response = await fetch(url, { method: "PATCH" });
	return handleResponse(response);
};

export const fetchRequest = async (url: string) => {
	const response = await fetch(url);
	return handleResponse(response);
};

export const postRequest = async (url: string, body: any) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	return handleResponse(response);
};

export const deleteRequest = async (url: string) => {
	const response = await fetch(url, { method: "DELETE" });
	return handleResponse(response);
};

export const putRequest = async (url: string, body: any) => {
	const response = await fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	return handleResponse(response);
};
