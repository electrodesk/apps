import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApplicationRepository } from './domain/repository/Application.repository';
import { CommonModule } from '@angular/common';
import { Application } from './domain/entity/Applikation.entity';
import { DashboardCardComponent } from './components/card';
import { ApplicationService } from '@trueffelmafia/electron-api';

@Component({
  standalone: true,
  selector: 'dashboard-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DashboardCardComponent]
})
export class AppComponent {

  private repository = inject(ApplicationRepository)

  applications = this.repository.applications

  openApp(application: Application) {
    // data should be undefined by default
    ApplicationService.open(application.url, void 0)
  }
}
