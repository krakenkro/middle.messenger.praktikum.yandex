export default class HttpClient {
    private readonly baseUrl = 'https://ya-praktikum.tech/api/v2';

    private async request<T>(
        method: string,
        endpoint: string,
        body: unknown = null,
        headers: Record<string, string> = {}
    ): Promise<T> {
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

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
            }
    
            const contentType = response.headers.get('Content-Type') || '';
            
            if (contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text() as unknown as T;
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

    public get<T>(
        endpoint: string,
        params: Record<string, unknown> = {},
        headers: Record<string, string> = {}
    ): Promise<T> {
        return this.request<T>('GET', endpoint, params, headers);
    }

    public post<T>(
        endpoint: string,
        body: unknown,
        headers: Record<string, string> = {}
    ): Promise<T> {
        return this.request<T>('POST', endpoint, body, headers);
    }

    public put<T>(
        endpoint: string,
        body: unknown,
        headers: Record<string, string> = {}
    ): Promise<T> {
        return this.request<T>('PUT', endpoint, body, headers);
    }

    public delete<T>(
        endpoint: string,
        body: unknown = null,
        headers: Record<string, string> = {}
    ): Promise<T> {
        return this.request<T>('DELETE', endpoint, body, headers);
    }
}
