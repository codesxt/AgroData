import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

	constructor(private http: HttpClient){

	}
	
	validateLogin(user: User){
		return this.http.post(environment.apiUrl + '/api/user/login',{
			email : user.email,
			password : user.password
		})
	}

}