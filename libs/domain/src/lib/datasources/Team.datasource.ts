import { DataSource } from "@angular/cdk/collections";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, merge, switchMap, take, takeUntil } from "rxjs";
import { TeamRepository } from "../repository/Team.repository";
import { Team } from "../entity/Team";

@Injectable()
export class TeamDataSource extends DataSource<Team> {

  private repository = inject(TeamRepository)

  private disconnect$ = new Subject<void>();

  override connect(): Observable<readonly Team[]> {
    return merge(this.createListStream(), this.createUpdateStream()).pipe(
      takeUntil(this.disconnect$)
    );
  }

  override disconnect(): void {
    this.disconnect$.next()
    this.disconnect$.complete()
  }

  private createListStream(): Observable<Team[]> {
    return this.repository.list().pipe(take(1))
  }

  private createUpdateStream(): Observable<Team[]> {
    return this.repository.changed()
      .pipe(
        takeUntil(this.disconnect$),
        switchMap(() => this.repository.list())
      )
  }
}
