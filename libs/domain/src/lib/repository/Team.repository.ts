import { Injectable } from "@angular/core";
import { AbstractRepository } from "./Abstract.repository";
import { TEAMS } from "../data/teams";
import type { Team } from "../entity/Team";

/**
 * alternate use Injection Tokens so we can say
 * EmployeeRepository is neither a MemoryRepository or
 * fetches data from remote. But to keep this simple
 * we stay with a Service which is a Repository
 */
@Injectable({
  providedIn: 'root'
})
export class TeamRepository extends AbstractRepository<Team> {
  protected override data = TEAMS;
}
