import { Component } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './app-sidebar-footer.component.html'
})
export class AppSidebarFooterComponent {
	constructor(
		private userSettingsService : UserSettingsService,
		private router 				: Router
	){}

	logoutApp() {
		this.userSettingsService.setUserLogged(false);
		this.router.navigate(['/login']);
	}
}