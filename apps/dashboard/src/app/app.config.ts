import { ApplicationConfig } from '@angular/core';
import { ApplicationService, MessageService } from '@electrodesk/api';

export const appConfig: ApplicationConfig = {
  providers: [{
    provide: ApplicationService,
    useClass: ApplicationService
  }, {
    provide: MessageService,
    useClass: MessageService
  }]
};
