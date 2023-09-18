import { Injectable } from "@angular/core";
import { AbstractRepository } from "./Abstract.repository";
import { Todo, TodoReadDTO } from "../entity/Todo";
import { TODOS } from "../data/todos";

/**
 * alternate use Injection Tokens so we can say
 * EmployeeRepository is neither a MemoryRepository or
 * fetches data from remote. But to keep this simple
 * we stay with a Service which is a Repository
 */
@Injectable({
  providedIn: 'root'
})
export class TodoRepository extends AbstractRepository<TodoReadDTO> {
  protected override data = TODOS

  get ghost(): Todo  {
    return {
      completed: false,
      task: '',
    }
  }
}
