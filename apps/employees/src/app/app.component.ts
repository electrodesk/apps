import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'

@Component({
  standalone: true,
  selector: 'employees-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule]
})
export class AppComponent {
  title = 'employees';
}
