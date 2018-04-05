import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { StationSelectComponent } from './station-select.component';

const routes: Routes = [
  {
    path: '',
    component: StationSelectComponent,
    data: {
      title: 'Selección de Estación'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationSelectRoutingModule {}
