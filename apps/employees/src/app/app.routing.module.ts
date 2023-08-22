import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListPageGuard } from './router/open.guard';
import { EmployeeResolver } from './router/employee.resolver';

export const appRoutes: Route[] = [{
  path: '',
  canActivate: [ListPageGuard],
  loadComponent: () => import('./components/user').then((component) => component.UsersComponent),
}, {
  path: 'form/:id',
  resolve: {
    employee: EmployeeResolver
  },
  loadComponent: () => import('./components/form').then((component) => component.FormComponent),
}, {
  path: 'form',
  resolve: {
    employee: EmployeeResolver
  },
  loadComponent: () => import('./components/form').then((component) => component.FormComponent),
}]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
