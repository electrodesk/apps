import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { MessageService } from '@trueffelmafia/electron-api';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'ElectronMessageService',
      useClass: MessageService
    },
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
  ],
};
