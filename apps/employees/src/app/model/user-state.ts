import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmployeeReadDTO } from '@app/domain'

@Injectable({
  providedIn: 'root'
})
export class EmployeState {

  private selctionModel: SelectionModel<EmployeeReadDTO> = new SelectionModel(false)

  toggleSelection(employee: EmployeeReadDTO) {
    this.selctionModel.toggle(employee)
  }

  selected(): EmployeeReadDTO | undefined {
    return this.selctionModel.selected[0];
  }

  clearSelection(): void {
    this.selctionModel.clear()
  }

  onChange(): Observable<EmployeeReadDTO | undefined> {
    return this.selctionModel.changed.pipe(
      map(() => this.selected())
    );
  }
}
