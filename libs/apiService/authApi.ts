import config from '@/config';
import { HttpService } from './httpService';

class AuthAPI {
	constructor(private http: HttpService) {}

	login(payload: API.Login) {
		return this.http.post<API.LoginResponse>('api/auth/login', payload);
	}

	registration(payload: API.CreateRegistration) {
		return this.http.post<API.LoginResponse>('api/auth/register',  payload );
	}

	userList(){
		return this.http.get<API.UserResponse>('api/user');
	}

	approval(id: string | number, payload: API.Status){
		return this.http.put<{message: string}>(`api/auth/register/${id}`, payload);
	}
}

const httpAuthService = new HttpService(config.apiURL);
export const authAPI = new AuthAPI(httpAuthService);
