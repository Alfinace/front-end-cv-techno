import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ListProduitComponent } from './produit/list-produit/list-produit.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'produit', component: ListProduitComponent, canActivate:[AuthGuard]},
  {path: 'client', component: ListProduitComponent, canActivate:[AuthGuard]},
  {path: 'login', component: SignInComponent},
  {path: 'register', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
