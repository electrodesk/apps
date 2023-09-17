import { ChangeDetectionStrategy, Component, NgZone, inject, signal } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Message } from '@trueffelmafia/electron-types';
import { EmployeeReadDTO, Team, TeamDataSource, EmployeeRepository } from '@app/domain'
import { TeamEmployeesComponent } from './employees';
import { ListState } from '../model/List.state';
import { IsCollapsedPipe } from '../pipes/collapsed.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'teams-list',
  templateUrl: './list.html',
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
  ],
})
export class ListPageComponent {

  readonly displayedColumns: (keyof Team)[] = ['bereich', 'project'];

  readonly dataSource = inject(TeamDataSource);

  readonly employee = signal<EmployeeReadDTO | null>(null)

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
          this.zone.run(() => this.onUserMessage(message as Message.MainProcessMessage<EmployeeReadDTO>))
        }
      })
    })
  }

  employeeSelectionChange(employee: EmployeeReadDTO | null): void {
    this.employee.set(employee)
  }

  toggleRow(team: Team): void {
    this.listState.select(team)
  }

  trackByPosition(_index: number, item: Team): number {
    return item.uid;
  }

  private onUserMessage(message: Message.MainProcessMessage<EmployeeReadDTO>): void {
    if (message.action === 'insert') {
      this.employeeRepository.insert(message.payload)
      return
    }

    const employee = message.payload;
    this.employeeRepository.update(employee.uid, employee)
  }
}
