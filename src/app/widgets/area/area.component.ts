import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  constructor() { }
  Highcharts: typeof Highcharts = Highcharts ;
  chartOptions = {   
    chart: {
       type: 'area'
    },
    title: {
       text: 'Statistque du commande effectue'
    },
    subtitle : {
       text: 'Source: Wikipedia.org'  
    },
       xAxis: {
          categories: [ 'Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
          text: null
       } 
    },
    yAxis : {
       min: 0, title: {
          text: 'Population (millions)', align: 'high'
       },
       labels: {
          overflow: 'justify'
       }
    },
    tooltip : {
       valueSuffix: ' millions'
    },
    plotOptions : {
       bar: {
          dataLabels: {
             enabled: true
          }
       }
    },
    credits: {
       enabled: false
    },
    series: [
       {
          name: 'Year 1800',
          data: [107, 31, 635, 203, 2]
       }, 
       {
          name: 'Year 1900',
          data: [133, 156, 947, 408, 6]
       }, 
       {
          name: 'Year 2008',
          data: [973, 914, 4054, 732, 34]
       }
    ]
 };

  ngOnInit(): void {
  }

}
