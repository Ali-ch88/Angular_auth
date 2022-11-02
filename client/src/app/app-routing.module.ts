import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './public/login/login.component';
import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { LoginGaurd } from './public/login/login.guard';

const routes: Routes = [
  {path:'', component:SecureComponent, canActivate:[LoginGaurd]},
  {
    path:'',
    component:PublicComponent,
    children:[
      {path:'login',component:LoginComponent}
    ]
  }
]
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
