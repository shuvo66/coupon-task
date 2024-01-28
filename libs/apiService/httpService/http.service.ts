import {RequestBody, RequestOptions } from './types';

export class HttpService {
	constructor(private baseURL: string) {}

	get<T>(url: string, options?: RequestOptions) {
		return this.request<T>('GET', url, null, options);
	}

	post<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('POST', url, JSON.stringify(body), options);
	}

	put<T>(url: string, body: unknown, options?: RequestOptions) {
		return this.request<T>('PUT', url, JSON.stringify(body), options);
	}

	private async request<T>(
		method: string,
		url: string,
		body: RequestBody,
		options?: RequestOptions
	): Promise<T> {
		const requestURL = `${this.baseURL}/${url}`;

		// Request headers
		const headers: RequestOptions['headers'] = {
			'content-type': 'application/json',
			...options?.headers,
		};

		// Send request
		try {
			const response = await fetch(requestURL, {
				method,
				headers,
				body,
			});
			if (response.ok) {
				try {
					return await (options?.isHTML ? response.text() : response.json());
				} catch (error) {
					return {} as T;
				}
			}

			const error = await (options?.isHTML ? response.text() : response.json());
			throw new Error(error);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error('Something went wrong');
			}

			throw new Error('Something went wrong');
		}
	}
}
