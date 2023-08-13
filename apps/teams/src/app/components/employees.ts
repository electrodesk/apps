import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Employee, EmployeeDataSource } from '@app/domain';

@Component({
  selector: 'teams-employees',
  templateUrl: './employees.html',
  standalone: true,
  imports: [CdkTableModule, CommonModule],
  providers: [EmployeeDataSource]
})
export class TeamEmployeesComponent implements OnInit {

  displayedColumns: (keyof Employee)[];

  dataSource = inject(EmployeeDataSource);

  @Input()
  filter = 'QA'

  constructor() {
    this.displayedColumns = ['name', 'lastName']
  }

  ngOnInit(): void {
    this.dataSource.setFilter(['bereich', this.filter])
  }
}
