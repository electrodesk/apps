import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Employee, EmployeeRepository } from '@app/domain';
import { Observable, of } from 'rxjs';

function EmployeeResolverFn(
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  employeeRepository: EmployeeRepository = inject(EmployeeRepository)
): Observable<Employee | undefined> {
  const id = route.paramMap.get('id')
  if (id === null) {
    return of(employeeRepository.ghost);
  }
  return of(employeeRepository.find(parseInt(id, 10)))
}

export const EmployeeResolver: ResolveFn<Employee | undefined> =  EmployeeResolverFn
