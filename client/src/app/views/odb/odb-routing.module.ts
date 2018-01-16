import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OdbComponent } from './odb.component';

const routes: Routes = [
  {
    path: '',
    component: OdbComponent,
    data: {
      title: 'Ojo de Buey'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdbRoutingModule {}
