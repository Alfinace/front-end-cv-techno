import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommandeService } from '../../services/commande.service';
import { ProduitService } from '../../services/produit.service';

@Component({
    selector: 'app-widget-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
    is = false;
    constructor(private produitService: ProduitService) {}
    Highcharts = Highcharts;
    ngOnInit(): void {
        this.getData().then(res  =>{
         const data_x = [];
         const data_y = [];
         if (res) {
            res.data.rows.forEach(row => {
                data_x.push(row.design);
                data_y.push(parseInt(row.stock));
            });
         }
         
            this.is = false
            var dataSeries = [];
            dataSeries.push({
               name: 'Nombre de produit',
               data: data_y,
               y: 0,
               color: '#007bff'
            })
            console.log(res.data.rows);
            
            this.chartOptions.series = dataSeries;
            this.chartOptions.xAxis.categories = data_x
            this.is = true
        }) 
    }
    
    getData(): any{
      return this.produitService.getAllProduitForChart().toPromise().then(res => {
          console.log(res);
          
         return res
      })
    }
    chartOptions = {
        chart: {
            type: 'spline',
            scrollablePlotArea: {
               minWidth: 600,
               scrollPositionX: 1
           }
        },
        title: {
            text: 'Statistque du produit',
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
