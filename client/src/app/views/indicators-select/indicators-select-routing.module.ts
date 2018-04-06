import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { IndicatorsSelectComponent } from './indicators-select.component';

const routes: Routes = [
  {
    path: '',
    component: IndicatorsSelectComponent,
    data: {
      title: 'Selección de Indicadores'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorsSelectRoutingModule {}
