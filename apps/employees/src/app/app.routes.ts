import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/user').then((component) => component.UsersComponent),
}, {
  path: 'create',
  loadComponent: () => import('./components/form').then((component) => component.FormComponent),
}, {
  path: 'update',
  loadComponent: () => import('./components/form').then((component) => component.FormComponent),
}];
