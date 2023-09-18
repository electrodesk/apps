import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { ApplicationService } from '@electrodesk/api';
import type { CommandErrorResponse, CommandResponse } from '@electrodesk/types';
import { ConfigService } from '@lib/config';
import { Todo } from '@app/domain';

function bootstrapApplication(applicationService: ApplicationService, configService: ConfigService): () => Promise<void> {
  return async () => {
    const response = await applicationService.getProperty<{ view?: string, id?: Todo['uid'] } | undefined>('data')
    if (!isErrorResponse(response)) {
      configService.set(response.data)
    }
  }
}

function isErrorResponse(response: CommandErrorResponse | CommandResponse): response is CommandErrorResponse {
  return response.code > 0
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ApplicationService,
      useClass: ApplicationService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: bootstrapApplication,
      deps: [ApplicationService, ConfigService],
      multi: true
    }
  ],
};
