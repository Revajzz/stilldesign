import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: 'home', loadChildren: './features/home/home.module#HomeModule' },
  { path: 'users', loadChildren: './features/users/users.module#UsersModule', canActivate: [AuthGuard] },

  { path: 'auth', loadChildren: './core/login/login.module#LoginModule' },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
