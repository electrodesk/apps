import { DataSource } from "@angular/cdk/collections";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, merge, switchMap, take, takeUntil } from "rxjs";
import { TodoRepository } from "../repository/Todo.repository";
import { Todo } from "../entity/Todo";

@Injectable({
  providedIn: 'root'
})
export class TodoDataSource extends DataSource<Todo> {

  private repository = inject(TodoRepository)

  private disconnect$ = new Subject<void>();

  override connect(): Observable<readonly Todo[]> {
    return merge(this.createListStream(), this.createUpdateStream()).pipe(
      takeUntil(this.disconnect$)
    );
  }

  override disconnect(): void {
    this.disconnect$.next()
    this.disconnect$.complete()
  }

  private createListStream(): Observable<Todo[]> {
    return this.repository.list().pipe(take(1))
  }

  private createUpdateStream(): Observable<Todo[]> {
    return this.repository.changed()
      .pipe(
        takeUntil(this.disconnect$),
        switchMap(() => this.repository.list())
      )
  }
}
