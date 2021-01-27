import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-widget-spline',
  templateUrl: './widget-spline.component.html',
  styleUrls: ['./widget-spline.component.css']
})
export class WidgetSplineComponent implements OnInit {

  is = false;
    constructor(private commandeService: CommandeService) {}
    Highcharts = Highcharts;
    ngOnInit(): void {
        this.getData().then(res  =>{
         const data_x = [];
         const data_y = [];
         res.data.forEach(row => {
             data_x.push(row.created);
             data_y.push(row.nbrs);
         });
            this.is = false
            var dataSeries = [];
            dataSeries.push({
               name: 'Nombre de produit',
               data: data_y,
               y: 0,
               color: 'rgb(204, 73, 104)'
            })
            this.chartOptions.series = dataSeries;
            this.chartOptions.xAxis.categories = data_x
            this.is = true
        }) 
    }
    
    getData(): any{
      return this.commandeService.commandeForChart().toPromise().then(res => {
         return res
      })
    }
    chartOptions = {
        chart: {
            type: 'area',
            scrollablePlotArea: {
               minWidth: 600,
               scrollPositionX: 1
           }
        },
        title: {
            text: 'Statistque du commande effectue par jour',
            color: '#eee'
        },
        xAxis: {
            categories: [],
            title: {
                text: null,
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high',
            },
            labels: {
                overflow: 'justify',
            },
        },
        tooltip: {
            valueSuffix: '',
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [],
    };
}
