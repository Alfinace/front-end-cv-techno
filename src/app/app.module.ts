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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitService } from './services/produit.service';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { ChoixClientComponent } from './commande/choix-client/choix-client.component';
import { AddCommandeComponent } from './commande/add-commande/add-commande.component';
import { ListPanierComponent } from './commande/list-panier/list-panier.component';
import { CommandeComponent } from './commande/commande/commande.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    DashboardComponent,
    ListClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    ChoixClientComponent,
    AddCommandeComponent,
    ListPanierComponent,
    CommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    WebRequestService,
    AuthGuard,
    UserService,
    ProduitService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
