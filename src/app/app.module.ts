import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { PointPipe } from './point.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DoughnutChartComponent,
    PointPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [PointPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
