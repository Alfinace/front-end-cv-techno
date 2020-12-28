import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';
import { CommandeService } from '../services/commande.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
    Highcharts: typeof Highcharts = Highcharts;
    /** Based on the screen size, switch from standard to one column per row */
    
    constructor(private commandeService: CommandeService) {}
    ngOnInit(): void {
       this.commandeService.commandeForChart().subscribe((observe: any)=>{
        console.log(observe);
       },
       (error: HttpErrorResponse)=>{
           console.log(error);
       })
    }

}
