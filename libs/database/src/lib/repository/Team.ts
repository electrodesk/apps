import { Injectable } from '@angular/core';
import { TeamDataSource, TeamItem } from '../data-sources/team';

@Injectable()
export class TeamRepository {

  private dataSource?: TeamDataSource;

  getDataSource(): TeamDataSource {
    if (!this.dataSource) {
      this.dataSource = new TeamDataSource()
    }
    return this.dataSource;
  }

  getVisibleColumns(): (keyof TeamItem)[] {
    return ['position', 'project', 'bereich']
  }
}
