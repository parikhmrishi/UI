import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { CreatequizComponent } from './createquiz/createquiz.component';
import { ErrorComponent } from './error/error.component';
import { ViewquizComponent } from './viewquiz/viewquiz.component';
import { AuthGuard } from './validate/auth.guard';
import { RoleGuard } from './validate/role.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path:'viewquiz', component:ViewquizComponent,canActivate:[AuthGuard]},
  { path: 'auth', component: AuthComponent },
  {
    path: 'createquiz', component: CreatequizComponent
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

