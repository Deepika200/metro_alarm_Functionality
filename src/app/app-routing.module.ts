import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteListComponent } from './route-list/route-list.component';
import { StopListComponent } from './stop-list/stop-list.component';
import { AlarmSetupComponent } from './alarm-setup/alarm-setup.component';

const routes: Routes = [
  {path:'',redirectTo:'/routes',pathMatch:'full'},
  {path:'routes',component:RouteListComponent},
  {path:'stops/:routeId',component:StopListComponent},
  {path:'alarm',component:AlarmSetupComponent},
  { path: 'route-list', component: RouteListComponent },
  { path: 'stop-list', component: StopListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
