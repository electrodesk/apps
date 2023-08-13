import { Observable } from "rxjs"

export interface AbstractRepository<T> {

  insert(item: T): void

  delete(item: T): void

  update(id: T[keyof T], patch: Partial<T>): void

  list(): Observable<T[]>

  find(id: T[keyof T]): T | undefined
}
