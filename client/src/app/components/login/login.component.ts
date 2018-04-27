import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

	// public user	: User;

  constructor(
  	private loginService 	: LoginService,
  	private router			: Router,
  	public user 			: User,
  	private userSettingsService : UserSettingsService,
  ) {
  	this.user = new User();
  }

  ngOnInit() {
  	console.log(this.userSettingsService.getUserLogged());
  	if (this.userSettingsService.getUserLogged().login && this.userSettingsService.getUserPreferences) {
  		this.router.navigate(['/indicators']);
  	} else if (this.userSettingsService.getUserLogged().login && !this.userSettingsService.getUserPreferences) {
  		this.router.navigate(['/station-select']);
  	}
  }

  openRegister() {
  	this.router.navigate(['/register'])
  }

  validateLogin() {
  	console.log(this.user);
  	if (this.user.email || this.user.password) {
		this.loginService.validateLogin(this.user).subscribe(result => {
			console.log('result is ', result);
			if (result['status'] === 'success') {
				this.userSettingsService.setUserLogged(true);
				this.router.navigate(['/station-select'])
			} else {
				alert(result['message']);
			}
		}, error => {
			console.log('error is ', error);
		});
  	} else {
  		alert('Ingrese su usuario y contraseña');
  	}
  }

}
