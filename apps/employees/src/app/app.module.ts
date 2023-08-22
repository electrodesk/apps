import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ConfigService } from '@lib/config';
import { ApplicationService, MessageService } from '@trueffelmafia/electron-api';

function bootstrapApplication(configService: ConfigService): () => Promise<void> {
  return async () => {
    const data = await ApplicationService.getProperty('data')
    configService.set(data)
  }
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'ElectronMessageService',
      useClass: MessageService
    },
    {
      provide: ApplicationService,
      useExisting: ApplicationService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (configService: ConfigService) => bootstrapApplication(configService),
      deps: [ConfigService]
    }
  ],
})
export class AppModule { }
