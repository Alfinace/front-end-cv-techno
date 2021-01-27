import { Component, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';
import { CommandeService } from '../services/commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
    Highcharts: typeof Highcharts = Highcharts;
     data = [];
    commandes = [];
    msg_empty_table = "Aucune commande";
    startIndex: number;
    endIndex: number;
    size =8;
    /** Based on the screen size, switch from standard to one column per row */

    constructor(private commandeService: CommandeService,
        private userService: UserService) {}
    ngOnInit(): void {
       this.getList()
       this.startIndex = 0;
        this.endIndex = this.size;
    }
    getList(page?: number): void {
        this.commandeService.list().subscribe(
            (observe: any) => {

                if (observe.list.length > 0 ) {
                    this.commandes = observe.list;
                    console.log(this.commandes);
                    
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.userService.logout();
                }
            }
        );
    }
}
