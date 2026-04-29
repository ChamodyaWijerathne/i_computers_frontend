export function getApiBaseUrl() {
	const apiBaseUrl = import.meta.env.VITE_API_URL;
	if (!apiBaseUrl) {
		throw new Error("VITE_API_URL is not configured.");
	}

	return String(apiBaseUrl).replace(/\/+$/, "");
}

export function buildApiUrl(pathname) {
	const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
	return `${getApiBaseUrl()}${normalizedPath}`;
}

export async function publicGetJson(pathname) {
	const requestUrl = new URL(buildApiUrl(pathname));
	requestUrl.searchParams.set("_ts", String(Date.now()));

	const response = await fetch(requestUrl.toString(), {
		method: "GET",
		cache: "no-store",
		credentials: "omit",
		headers: {
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		const errorBody = await response.text().catch(() => "");
		const error = new Error(`Request failed with status ${response.status}`);
		error.status = response.status;
		error.url = requestUrl.toString();
		error.body = errorBody;
		throw error;
	}

	return response.json();
}