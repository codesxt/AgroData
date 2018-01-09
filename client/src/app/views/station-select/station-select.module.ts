import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StationSelectComponent } from './station-select.component';
import { StationSelectRoutingModule } from './station-select-routing.module';

@NgModule({
  imports: [
    StationSelectRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ StationSelectComponent ]
})
export class StationSelectModule { }
