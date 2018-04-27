import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {

	constructor(private http: HttpClient){

	}

	createUser(user: User) {
		return this.http.post(environment.apiUrl + '/api/user/create',{
			name		: user.name,
			email		: user.email,
			company		: user.company,
			phone		: user.phone,
			password	: user.password
		})
	}

}