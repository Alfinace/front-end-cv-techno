import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { UserComponent } from './user/user.component';
import { WebRequestService } from './services/web-request.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './_helpers/auth.guard';
import { ListProduitComponent } from './produit/list-produit/list-produit.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { UpdateProduitComponent } from './produit/update-produit/update-produit.component';
import { ProduitService } from './services/produit.service';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { ChoixClientComponent } from './commande/choix-client/choix-client.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { ListPanierComponent } from './commande/list-panier/list-panier.component';
import { CommandeComponent } from './commande/commande/commande.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommandeService } from './services/commande.service';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutHomeComponent } from './layouts/layout-home/layout-home.component';
import { NumberToLetterService } from './services/numberToLetter.service';
import { CommandeListComponent } from './commande/commande-list/commande-list.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaComponent } from './widgets/area/area.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ChiffreAffaireComponent } from './commande/chiffre-affaire/chiffre-affaire.component';
import { WidgetPieComponent } from './widgets/pie/widget-pie/widget-pie.component';
import { WidgetSplineComponent } from './widgets/spline/widget-spline/widget-spline.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    ListProduitComponent,
    AddProduitComponent,
    UpdateProduitComponent,
    ListClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    ChoixClientComponent,
    AddCommandeComponent,
    ListPanierComponent,
    CommandeComponent,
    NavComponent,
    DashboardComponent,
    LayoutHomeComponent,
    CommandeListComponent,
    AreaComponent,
    ChiffreAffaireComponent,
    WidgetPieComponent,
    WidgetSplineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HighchartsChartModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    WebRequestService,
    AuthGuard,
    UserService,
    ProduitService,
    CommandeService,
    NumberToLetterService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
