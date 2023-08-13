import { Observable, Subject, of } from "rxjs"

export interface AbstractEntry {
  uid: number
}

export abstract class AbstractRepository<T extends AbstractEntry> {

  protected abstract data: AbstractEntry[]

  private changed$ = new Subject<void>()

  /**
   * @description insert new employee
   */
  insert(item: Omit<T, 'uid'>): T {
    // latest uid
    let uid = 0;
    for (const entry of this.data) {
      uid = Math.max(entry.uid, uid)
    }

    const inserted = { ...item, uid: uid + 1} as T;
    this.data = [...this.data, inserted]
    this.changed$.next()
    return inserted
  }

  /**
   * remove employee
   */
  delete(item: T): void {
    this.data = this.data.filter((entry) => entry.uid === item.uid)
  }

  /**
   * @description update employee by uid
   */
  update(entryId: number, patch: Partial<T>): T | undefined {
    this.data = this.data.map((entry) => {
      if (entry.uid === entryId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { uid, ...data } = patch;

        return {
          ...entry,
          ...data
        }
      }
      return entry
    })
    this.changed$.next()
    return this.find(entryId)
  }

  /**
   * @description get all employees
   */
  list(): Observable<T[]> {
    const list = JSON.parse(JSON.stringify(this.data)) as T[]
    return of(list)
  }

  /**
   * @description find employee by uid
   */
  find(entryId: number): T | undefined {
    const match = this.data.find((entry) => entry.uid === entryId)
    return { ...match } as T | undefined
  }

  changed(): Observable<void> {
    return this.changed$.asObservable()
  }
}
