import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './widget-pie.component.html',
  styleUrls: ['./widget-pie.component.css']
})
export class WidgetPieComponent implements OnInit {
  is = false;
    constructor(private commandeService: CommandeService) {}
    Highcharts = Highcharts;
    ngOnInit(): void {
        this.getData().then(res  =>{
         const data_x = [];
         const data_y = [];
         console.log(res);
         
         res.data.forEach(row => {
             data_x.push(row.lastName+" "+ row.firstName);
             data_y.push(parseInt(row.montant));
         });
            this.is = false
            console.log(data_y);
            
            var dataSeries = [];
            dataSeries.push({
               name: 'Nombre de produit commandé',
               data: data_y,
               y: 0,
               color: '#007bff'
            })
            this.chartOptions.series = dataSeries;
            this.chartOptions.xAxis.categories = data_x
            this.is = true
        }) 
    }
    
    getData(): any{
      
      return this.commandeService.commandeForChiffreAffaire('').toPromise().then(res => {
         return res
      })
    }
    chartOptions = {
        chart: {
            type: 'bar',
            scrollablePlotArea: {
               minWidth: 600,
               scrollPositionX: 1
           }
        },
        title: {
            text: 'Statistque du chiffre d\'affaire',
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
