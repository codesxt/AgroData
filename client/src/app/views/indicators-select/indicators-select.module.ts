import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndicatorsSelectComponent } from './indicators-select.component';
import { IndicatorsSelectRoutingModule } from './indicators-select-routing.module';

@NgModule({
  imports: [
    IndicatorsSelectRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ IndicatorsSelectComponent ]
})
export class IndicatorsSelectModule { }
