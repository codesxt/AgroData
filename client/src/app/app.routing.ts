import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

import {
  LoginComponent,
  RegisterComponent
} from './components';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: FullLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'station-select',
        pathMatch: 'full'
      },
      {
        path: 'indicators',
        loadChildren: './views/indicators/indicators.module#IndicatorsModule'
      },

      {
        path: 'indicators-select',
        loadChildren: './views/indicators-select/indicators-select.module#IndicatorsSelectModule'
      },
      {
        path: 'station-select',
        loadChildren: './views/station-select/station-select.module#StationSelectModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'odb',
        loadChildren: './views/odb/odb.module#OdbModule'
      }
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
