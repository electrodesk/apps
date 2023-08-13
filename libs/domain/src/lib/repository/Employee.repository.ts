import { Injectable } from "@angular/core";
import { Employee } from "../entity/Employe";
import { AbstractRepository } from "./Abstract.repository";
import { Observable, Subject, of } from "rxjs";
import { EMPLOYEES } from "../data/employees";

/**
 * alternate use Injection Tokens so we can say
 * EmployeeRepository is neither a MemoryRepository or
 * fetches data from remote. But to keep this simple
 * we stay with a Service which is a Repository
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeRepository implements AbstractRepository<Employee> {

  private employees: Employee[] = EMPLOYEES

  private changed$ = new Subject<void>()

  /**
   * @description insert new employee
   */
  insert(item: Omit<Employee, 'uid'>): void {
    // latest uid
    let uid = 0;
    for (const employee of this.employees) {
      uid = Math.max(employee.uid, uid)
    }

    this.employees = [...this.employees, { ...item, uid: uid + 1 }]
    this.changed$.next()
  }

  /**
   * remove employee
   */
  delete(item: Employee): void {
    this.employees = this.employees.filter((employee) => employee.uid === item.uid)
  }

  /**
   * @description update employee by uid
   */
  update(employeeId: Employee['uid'], patch: Partial<Employee>): void {
    this.employees = this.employees.map((employee) => {
      if (employee.uid === employeeId) {
        // exclude uid so we do not update this one
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { uid, ...data } = patch;

        return {
          ...employee,
          ...data
        }
      }
      return employee
    })
  }

  /**
   * @description get all employees
   */
  list(): Observable<Employee[]> {
    const list = JSON.parse(JSON.stringify(this.employees)) as Employee[]
    return of(list)
  }

  /**
   * @description find employee by uid
   */
  find(employeeId: Employee['uid']): Employee | undefined {
    const match = this.employees.find((employee) => employee.uid === employeeId)
    return { ...match } as Employee | undefined
  }

  changed(): Observable<void> {
    return this.changed$.asObservable()
  }
}
