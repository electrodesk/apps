import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, ResolveFn, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Todo, TodoRepository } from "@app/domain";
import { ConfigService } from "@lib/config";

/**
 * @description route guard to navigate by initial data, if app is in edit mode we have to enter directly form
 * this happens if we called this application from another application to edit an TODO
 */
export const routeGuard: CanActivateChildFn = (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const configService: ConfigService<{view: 'edit', uid: string}> = inject(ConfigService)
  const router: Router = inject(Router);

  if (configService.get()?.view === 'edit' && state.url !== '/form') {
    router.navigate(['form'])
    return false
  }
  return true
}

const todoResolver: ResolveFn<Todo> = () => {

  const todoRepository = inject(TodoRepository);
  const configService: ConfigService<{view: 'edit', uid: number}> = inject(ConfigService)
  const todoId = configService.get()?.uid;

  if (configService.get()?.view === 'edit' && todoId) {
    return todoRepository.find(todoId) ?? todoRepository.ghost
  }

  return todoRepository.ghost;
  // navigate forward to error page
}

export const routes: Route[] = [
  {
    path: '',
    canActivateChild: [routeGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/list.component').then((c) => c.ListComponent)
      },
      {
        path: 'create',
        redirectTo: 'form',
        pathMatch: 'full'
      },
      {
        path: 'form',
        loadComponent: () => import('./components/form.component').then((c) => c.TodoFormComponent),
        resolve: { todo: todoResolver }
      },
      {
        path: 'form/:id',
        loadComponent: () => import('./components/form.component').then((c) => c.TodoFormComponent),
        resolve: { todo: todoResolver }
      }
    ]
  }]
