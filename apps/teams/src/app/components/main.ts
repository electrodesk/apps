import { Component, NgZone, inject } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { TeamEmployeesComponent } from './employees';
import { Message } from '@trueffelmafia/electron-types';
import { Employee, Team, TeamDataSource, EmployeeRepository } from '@app/domain'
import { ListState } from '../model/List.state';
import { IsCollapsedPipe } from '../pipes/collapsed.pipe';
import { ApplicationService } from '@trueffelmafia/electron-api';

@Component({
  selector: 'teams-list',
  templateUrl: './main.html',
  standalone: true,
  imports: [
    CdkTableModule,
    CommonModule,
    TeamEmployeesComponent,
    IsCollapsedPipe
  ],
  providers: [
    TeamDataSource,
    ListState,
    EmployeeRepository
  ]
})
export class ListPageComponent {

  displayedColumns: (keyof Team)[] = ['bereich', 'project'];

  dataSource = inject(TeamDataSource);

  // @TODO refactor and remove from component
  private employeeRepository = inject(EmployeeRepository)

  private listState = inject(ListState)

  constructor(
    private readonly zone: NgZone,
  ) {
    // TODO refactor
    this.zone.runOutsideAngular(() => {
      window.tm_electron.message((message) => {
        if (message.sender === 'employee') {
          this.zone.run(() => this.onUserMessage(message as Message.MainProcessMessage<Employee>))
        }
      })
    })
  }

  addEmployee(): void {
    const payload = { action: 'create' };
    ApplicationService.open('http://localhost:4202', payload, true)
  }

  toggleRow(team: Team): void {
    this.listState.select(team)
  }

  trackByPosition(_index: number, item: Team): number {
    return item.uid;
  }

  private onUserMessage(message: Message.MainProcessMessage<Employee>): void {
    if (message.action === 'insert') {
      this.employeeRepository.insert(message.payload)
      return
    }

    const employee = message.payload;
    this.employeeRepository.update(employee.uid, employee)
  }
}
