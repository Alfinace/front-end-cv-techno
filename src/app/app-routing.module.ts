import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ListProduitComponent } from './produit/list-produit/list-produit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CommandeComponent } from './commande/commande/commande.component';
import { ListPanierComponent } from './commande/list-panier/list-panier.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'produit/list', component: ListProduitComponent, canActivate: [AuthGuard]},
  {path: 'client/list', component: ListClientComponent, canActivate: [AuthGuard]},
  {path: 'commande', component: CommandeComponent, canActivate: [AuthGuard]},
  {path: 'commande/list', component: ListPanierComponent, canActivate: [AuthGuard]},
  {path: 'login', component: SignInComponent},
  {path: 'register', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
