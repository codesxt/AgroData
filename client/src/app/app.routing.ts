import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'indicators',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
