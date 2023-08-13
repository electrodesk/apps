import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: 'list',
  loadComponent: () => import('./components/main').then((page) => page.ListPageComponent)
}, {
  path: '',
  redirectTo: 'list',
  pathMatch: 'full'
}];
