import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OdbComponent } from './odb.component';
import { OdbRoutingModule } from './odb-routing.module';

@NgModule({
  imports: [
    OdbRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ OdbComponent ]
})
export class OdbModule { }
