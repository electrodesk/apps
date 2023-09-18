import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConfigService<T = unknown> {

  uuid = Math.random().toString(32)

  // downside we can only observe all of this
  private config?: T;

  set(config: T): void {
    this.config = config
  }

  get(): T | undefined {
    return this.config
  }
}
