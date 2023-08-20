import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { ApplicationService, MessageService } from '@trueffelmafia/electron-api'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

function bootstrapApplication(): Promise<unknown> {
  // should not be static ? but it has to be a singleton for sure
  return ApplicationService.getProperty('data')
    .then((value) => {
      console.log(value)
    })
}

export const appConfig: ApplicationConfig = {
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
      useFactory: () => bootstrapApplication,
    },
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
