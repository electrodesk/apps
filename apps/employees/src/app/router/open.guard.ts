import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfigService } from '@lib/config';
import { EmployeeCreatePayload, EmployeeEditPayload, EmployeePayload } from '@app/api';

export const ListPageGuard: CanActivateFn = () => {
    const configService: ConfigService<EmployeeCreatePayload | EmployeeEditPayload> = inject(ConfigService)
    const router = inject(Router)
    const config = configService.get()

    if (config?.action !== 'create' && config?.action !== 'edit') {
      return true;
    }

    const routeParams: number[] = []
    if (isEditPayload(config) && config.id) {
      routeParams.push(config.id)
    }
    router.navigate(['form', ...routeParams])
    return false
}

function isEditPayload(config: EmployeePayload): config is EmployeeEditPayload {
  return config.action === 'edit'
}
