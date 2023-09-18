import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { Application } from '../domain/entity/Applikation.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard-card',
  templateUrl: './card.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class DashboardCardComponent {

  @Output()
  openApp = new EventEmitter<Application>()

  @Input()
  application?: Application

  @HostBinding(`attr.testId`)
  get testId(): string {
    return `dashboard-card-${this.application?.id}`
  }

  handleOpenApp(): void {
    this.openApp.emit(this.application)
  }
}
