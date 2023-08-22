import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { EmployeeEditPayload, EmployeeCreatePayload } from '@app/api';
import { EmployeeReadDTO, EmployeeDataSource } from '@app/domain';
import { ApplicationService } from '@trueffelmafia/electron-api';

@Component({
  selector: 'teams-employees',
  templateUrl: './employees.html',
  standalone: true,
  imports: [CdkTableModule, CommonModule],
  providers: [EmployeeDataSource]
})
export class TeamEmployeesComponent implements OnInit {

  displayedColumns: (keyof EmployeeReadDTO)[]

  dataSource = inject(EmployeeDataSource)

  private selected?: EmployeeReadDTO | undefined

  @Input()
  filter = 'QA'

  constructor() {
    this.displayedColumns = ['name', 'lastName']
  }

  ngOnInit(): void {
    this.dataSource.setFilter(['bereich', this.filter])
  }

  handleAction(): void {
    if (this.selected?.uid !== undefined) {
      this.editEmployee(this.selected.uid)
      return
    }
    this.createEmployee()
  }

  private editEmployee(id: EmployeeReadDTO['uid']): void {
    const payload: EmployeeEditPayload = { action: 'edit', id }
    ApplicationService.open('http://localhost:4202', payload, true)
  }

  private createEmployee(): void {
    const payload: EmployeeCreatePayload = {
      action: 'create',
      employee: {
        bereich: this.filter ,
        project: 'QAIP'
      }
    }
    ApplicationService.open('http://localhost:4202', payload, true)
  }

  selectEmployee(employee: EmployeeReadDTO | undefined) {
    this.selected = this.selected === employee ? undefined : employee
  }
}
