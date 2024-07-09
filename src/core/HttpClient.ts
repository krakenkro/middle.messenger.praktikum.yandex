export default class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private request(
		method: string,
		endpoint: string,
		body: any = null,
		headers: Record<string, string> = {},
	): Promise<any> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			const url = method === 'GET' && body ? `${endpoint}?${this.buildQueryString(body)}` : endpoint;

			xhr.open(method, this.baseUrl + url);

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
				}
			};

			xhr.onerror = () => {
				reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
			};

			if (method === 'GET' || !body) {
				xhr.send();
			} else {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(body));
			}
		});
	}

	private buildQueryString(params: Record<string, any>): string {
		return Object.keys(params)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
			.join('&');
	}

	public get(
		endpoint: string,
		params: Record<string, any> = {},
		headers: Record<string, string> = {},
	): Promise<any> {
		return this.request('GET', endpoint, params, headers);
	}

	public post(
		endpoint: string,
		body: any,
		headers: Record<string, string> = {},
	): Promise<any> {
		return this.request('POST', endpoint, body, headers);
	}

	public put(
		endpoint: string,
		body: any,
		headers: Record<string, string> = {},
	): Promise<any> {
		return this.request('PUT', endpoint, body, headers);
	}

	public delete(
		endpoint: string,
		body: any = null,
		headers: Record<string, string> = {},
	): Promise<any> {
		return this.request('DELETE', endpoint, body, headers);
	}
}
