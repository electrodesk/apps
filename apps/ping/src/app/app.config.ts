import { ApplicationConfig, InjectionToken } from '@angular/core';
import { ApplicationService } from '@trueffelmafia/electron-api';

export const ELECTRON_APPLICATION_SERVICE = new InjectionToken<ApplicationService>(`Application Service to communicate with electron`)

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ELECTRON_APPLICATION_SERVICE,
      useClass: ApplicationService
    }
  ],
};
