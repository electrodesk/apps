import { InjectionToken } from '@angular/core';
import { User } from '../data-sources/users';
import { AbstractRepository } from './Abstract.repository';

export type EmployeeRepository = AbstractRepository<User>

/**
 * injection token
 */
export const EmployeeRepository = new InjectionToken<EmployeeRepository>('EmployeeRepository')

/**
 * memory repository employees
 */
export class EmployeeMemoryRepository implements EmployeeRepository {

  insert(item: User): void {
    throw new Error('Method not implemented.');
  }

  update(patch: Partial<User>): void {
    throw new Error('Method not implemented.');
  }
  delete(item: User): void {
    throw new Error('Method not implemented.');
  }
  read(item: User): void {
    throw new Error('Method not implemented.');
  }
}
