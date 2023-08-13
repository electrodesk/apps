import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '@app/domain'

@Injectable({
  providedIn: 'root'
})
export class EmployeState {

  private selctionModel: SelectionModel<Employee> = new SelectionModel(false)

  toggleSelection(employee: Employee) {
    this.selctionModel.toggle(employee)
  }

  selected(): Employee | undefined {
    return this.selctionModel.selected[0];
  }

  clearSelection(): void {
    this.selctionModel.clear()
  }

  onChange(): Observable<Employee | undefined> {
    return this.selctionModel.changed.pipe(
      map(() => this.selected())
    );
  }
}
