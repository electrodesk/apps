import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ping-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Ping';

  sendPing(): void {
    // so we have an own service like system service for this on this
    // brrr i hate this
    (window as any).tm_electron.exec({
      // maybe only ping is more intuitive
      command: 'system:ping'
    }).then((res: any) => {
      console.log(res)
    })
  }
}
