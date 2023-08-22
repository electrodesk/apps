import type { Employee } from '@app/domain'

export interface EmployeePayload {
  action: 'create' | 'edit',
}

export interface EmployeeCreatePayload extends EmployeePayload {
  action: 'create',
  employee: Pick<Employee, 'bereich' | 'project'>
}

export interface EmployeeEditPayload extends EmployeePayload {
  action: 'edit'
  id: Employee['uid']
}
