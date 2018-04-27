import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [ RegisterService ]
})
export class RegisterComponent implements OnInit {

	// public user	: User;

  constructor(
  	private registerService 	: RegisterService,
  	private router			: Router,
  	public user 			: User
  ) {
  	this.user = new User();
  }

  ngOnInit() {
  }

  createUser() {
    console.log(this.user);
    if (this.user.email || this.user.password || this.user.name || this.user.company
      || this.user.phone) {
      this.registerService.createUser(this.user).subscribe(result => {
        console.log('result is ', result);
        if (result['status'] === 'success') {
          alert('Usuario creado con exito!');
          this.router.navigate(['/login'])
        } else {
          alert(result['message']);
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('Complete todos los campos');
    }
  }

}
