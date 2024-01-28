export type HttpResponse<T> =
	| { success: true; data: T; message?: string }
	| { success: false; data?: T; message: string };

export type RequestOptions = {
	headers?: Record<string, string>;
	isHTML?: boolean;
};

export type RequestBody = string | FormData | null;


export type RefreshTokenResponse = {
	access_token: string;
};
