import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApplicationService } from '@electrodesk/api';
import { DashboardCardComponent } from './components/card';
import { Application } from './domain/entity/Applikation.entity';
import { ApplicationRepository } from './domain/repository/Application.repository';
import { TodoWidgetComponent } from './components/todo-widget';

@Component({
  standalone: true,
  selector: 'dashboard-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DashboardCardComponent, TodoWidgetComponent]
})
export class AppComponent {

  private repository = inject(ApplicationRepository)

  private readonly applicationService = inject(ApplicationService)

  applications = this.repository.applications

  async openApp(application: Application) {
    const app = await this.applicationService.open(application.url, null, true)
    console.log(app)
  }
}
