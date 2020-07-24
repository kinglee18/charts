import { Component } from '@angular/core';
import { DoughnutChart } from './doughnut-chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chartsList: Array<DoughnutChart> = [
    {
      title: 'REVENUE',
      element1: { ammount: 120000, color: '#88d146', name: 'Tablet' },
      element2: { ammount: 80000, color: '#3c6616', name: 'Smarthphone' },
      euroCurrency: true
    },
    {
      title: 'IMPRESSIONS',
      element1: { ammount: 20000000, color: '#74c8e7', name: 'Tablet' },
      element2: { ammount: 30000000, color: '#2d5466', name: 'Smarthphone' }
    },
    {
      title: 'VISITS',
      element1: { ammount: 480000000, color: '#f4bf2f', name: 'Tablet' },
      element2: { ammount: 120000000, color: '#ba6226', name: 'Smarthphone' }
    }
  ];
}
