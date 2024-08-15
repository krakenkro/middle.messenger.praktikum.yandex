export default class HttpClient {
    private readonly baseUrl = 'https://ya-praktikum.tech/api/v2';

    private async request(
        method: string,
        endpoint: string,
        body: unknown = null,
        headers: Record<string, string> = {}
    ): Promise<any> {
        const url = method === 'GET' && body ? `${this.baseUrl + endpoint}?${this.buildQueryString(body as {})}` : this.baseUrl + endpoint;
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials: 'include',
        };

        if (method !== 'GET' && body) {
            options.body = JSON.stringify(body);
        }

        // if (body && !(body instanceof FormData)) {
        //     options.body = JSON.stringify(body);
        //     if (options.headers && typeof options.headers === 'object') {
        //         (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
        //     }
        // } else if (body instanceof FormData) {
        //     options.body = body;
        // }

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }
    
            const contentType = response.headers.get('Content-Type') || '';
            
            if (contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            throw error;
        }
    }

    private buildQueryString(params: Record<string, unknown>): string {
        return Object.keys(params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
            .join('&');
    }

    public get(
        endpoint: string,
        params: Record<string, unknown> = {},
        headers: Record<string, string> = {}
    ): Promise<unknown> {
        return this.request('GET', endpoint, params, headers);
    }

    public post(
        endpoint: string,
        body: unknown,
        headers: Record<string, string> = {}
    ): Promise<unknown> {
        return this.request('POST', endpoint, body, headers);
    }

    public put(
        endpoint: string,
        body: unknown,
        headers: Record<string, string> = {}
    ): Promise<unknown> {
        return this.request('PUT', endpoint, body, headers);
    }

    public delete(
        endpoint: string,
        body: unknown = null,
        headers: Record<string, string> = {}
    ): Promise<unknown> {
        return this.request('DELETE', endpoint, body, headers);
    }
}
