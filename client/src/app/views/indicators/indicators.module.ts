import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndicatorsComponent } from './indicators.component';
import { IndicatorsRoutingModule } from './indicators-routing.module';

@NgModule({
  imports: [
    IndicatorsRoutingModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [ IndicatorsComponent ]
})
export class IndicatorsModule { }
