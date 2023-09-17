import { Injectable } from "@angular/core";
import { Employee, EmployeeReadDTO } from "../entity/Employe";
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
export class EmployeeRepository extends AbstractRepository<EmployeeReadDTO> {
  protected override data = EMPLOYEES

  get ghost(): Employee  {
    return {
      bereich: '',
      lastName: '',
      name: '',
      project: ''
    }
  }
}
