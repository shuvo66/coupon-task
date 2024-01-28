import config from '@/config';
import { HttpService } from './httpService';

class CouponAPI {
	constructor(private http: HttpService) {}

	list() {
		return this.http.get<API.LoginResponse>('api/coupon/coupon-list');
	}

	createCoupon(value: API.CreateRegister) {
		return this.http.post<{message: 'string'}>('api/coupon/coupon-create',  value );
	}
    approvalCoupon(id: string, payload: API.Status){
        return this.http.put<{message: 'string'}>(`api/coupon/coupon-aproval/${id}`, payload)
    }
}

const httpAuthService = new HttpService(config.apiURL);
export const couponAPI = new CouponAPI(httpAuthService);
