export interface AbstractRepository<T> {

  insert(item: T): void

  update(patch: Partial<T>): void

  delete(item: T): void

  read(item: T): void
}
