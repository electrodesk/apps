import { DataSource } from "@angular/cdk/collections";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, merge, switchMap, take, takeUntil } from "rxjs";
import { Employee } from "../entity/Employe";
import { EmployeeRepository } from "../repository/Employee.repository";

@Injectable()
export class EmployeeDataSource extends DataSource<Employee> {

  private repository = inject(EmployeeRepository)

  private disconnect$ = new Subject<void>();

  override connect(): Observable<readonly Employee[]> {
    return merge(this.createListStream(), this.createUpdateStream()).pipe(
      takeUntil(this.disconnect$)
    );
  }

  override disconnect(): void {
    this.disconnect$.next()
    this.disconnect$.complete()
  }

  private createListStream(): Observable<Employee[]> {
    return this.repository.list().pipe(take(1))
  }

  private createUpdateStream(): Observable<Employee[]> {
    return this.repository.changed()
      .pipe(
        takeUntil(this.disconnect$),
        switchMap(() => this.repository.list())
      )
  }
}
