import { Component, OnInit, Input, ViewEncapsulation, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { DoughnutChart } from '../doughnut-chart';
import { PointPipe } from '../point.pipe';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements AfterViewInit {
  @ViewChild('container')
  private chartContainer: ElementRef;
  @Input() chartInfo: DoughnutChart;

  constructor(private pipe: PointPipe) { }

  radius: number;
  private arc: any; private pie: any; private slices: any;
  private color: any;
  private svg: any; private mainContainer: any;
  dataSource = [];
  total: number;

  getData() {
    this.dataSource.push({ abs: this.chartInfo.element2.ammount });
    this.dataSource.push({ abs: this.chartInfo.element1.ammount });
  }

  ngAfterViewInit() {
    this.getData();
    this.total = this.chartInfo.element1.ammount + this.chartInfo.element2.ammount;

    this.svg = d3.select(this.chartContainer.nativeElement).select('svg');
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal().range([this.chartInfo.element2.color, this.chartInfo.element1.color]);
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    this.pie = d3.pie().sort(null).value((d: any) => d.abs);
    this.draw();
  }

  private setSVGDimensions() {
    this.radius = (Math.min(160, 160)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
    this.drawCenter();
  }

  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(this.radius * .90);
  }

  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    this.slices
      .attr('fill', (d, i) => this.color(i));
  }

  getPercentage(firstElement = true): string {
    if (firstElement) {
      return `${(this.chartInfo.element1.ammount * 100) / this.total}%`;
    }
    return `${(this.chartInfo.element2.ammount * 100) / this.total}%`;
  }
  private drawCenter() {
    this.svg.append('text')
      .text(this.chartInfo.title)
      .attr('id', 'title')
      .attr('x', this.radius)
      .attr('y', this.radius - 10)
      .style('font-size', '16px')
      .style('fill', '#bababa')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle');
    let text;
    if (this.chartInfo.euroCurrency) {
      text = this.pipe.transform(this.total.toString(), ' €');
    } else {
      text = this.pipe.transform(this.total.toString());
    }
    this.svg.append('text')
      .text(text)
      .attr('id', 'total')
      .attr('x', this.radius)
      .attr('y', this.radius + 12)
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('text-anchor', 'middle');
  }
}
