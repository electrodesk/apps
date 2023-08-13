import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee, EmployeeDataSource } from '@app/domain'
import { EmployeState } from '../model/user-state';

@Component({
  selector: 'employees-list',
  templateUrl: './user.html',
  standalone: true,
  imports: [CdkTableModule, CommonModule, RouterModule],
  styleUrls: ['user.scss'],
  providers: [EmployeeDataSource]
})
export class UsersComponent implements OnInit {

  displayedColumns: (keyof Employee)[];

  selected$: Observable<Employee | undefined>

  @Input()
  filter = 'QA'

  constructor(
    public readonly dataSource: EmployeeDataSource,
    private readonly router: Router,
    private readonly userState: EmployeState,
  ) {
    this.displayedColumns = ['name', 'lastName', 'bereich']
    this.selected$ = this.userState.onChange()
  }

  ngOnInit(): void {
    this.userState.clearSelection()
  }

  openForm(): void {
    this.router.navigate(['./create'])
  }

  clickUser(user: Employee): void {
    this.userState.toggleSelection(user)
  }
}
