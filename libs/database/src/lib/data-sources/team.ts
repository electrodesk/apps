import { BehaviorSubject, Observable } from "rxjs";
import { DataSource } from '@angular/cdk/collections'

export interface TeamItem {
  bereich: string;
  position: number;
  project: string;
  expanded: boolean;
}

const ELEMENT_DATA: TeamItem[] = [
  {position: 1, bereich: 'QA', project: 'QAIP', expanded: false},
  {position: 2, bereich: 'Teamleiter', project: 'QAIP', expanded: false},
  {position: 3, bereich: 'Anforderungsmanagement', project: 'QAIP', expanded: false},
  {position: 4, bereich: 'Backend', project: 'QAIP', expanded: false},
  {position: 5, bereich: 'Frontend', project: 'QAIP', expanded: false},
];

export class TeamDataSource extends DataSource<TeamItem> {
  /** Stream of data that is provided to the table. */
  private data: BehaviorSubject<TeamItem[]>

  private items: TeamItem[] = JSON.parse(JSON.stringify(ELEMENT_DATA));

  constructor() {
    super();
    this.data = new BehaviorSubject(this.items);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TeamItem[]> {
    return this.data.asObservable();
  }

  disconnect() {
    // not empty
  }

  update(id: TeamItem['position'], patch: Partial<Omit<TeamItem, 'position'>>) {
    this.items = this.items.map((item) => {
      if (item.position !== id) {
        return item
      }

      return {
        ...item,
        ...patch
      }
    })

    this.data.next(this.items)
  }
}
