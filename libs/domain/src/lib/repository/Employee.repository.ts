import { Injectable } from "@angular/core";
import { Employee } from "../entity/Employe";
import { AbstractRepository } from "./Abstract.repository";
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
export class EmployeeRepository extends AbstractRepository<Employee> {
  protected override data = EMPLOYEES
}
