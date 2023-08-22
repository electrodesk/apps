import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee, EmployeeReadDTO, EmployeeRepository } from '@app/domain';
import { MessageService } from '@trueffelmafia/electron-api';

type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>
}>;

@Component({
  selector: 'employees-form',
  templateUrl: './form.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class FormComponent {

  public userForm: ModelFormGroup<Omit<EmployeeReadDTO, 'uid'>>;

  private employee: Employee;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userRepository: EmployeeRepository,
    @Inject('ElectronMessageService') private readonly messageService: MessageService
  ) {
    this.employee = this.activatedRoute.snapshot.data['employee']
    this.userForm = this.createUserForm(this.employee)
  }

  /**
   * TODO refactor logic should not be in component
   */
  save(): void {
    const formData = this.userForm.getRawValue()
    if (this.employee.uid === undefined) {
      const inserted = this.userRepository.insert(formData)
      this.messageService.send('application', 'employee', 'insert', inserted)
    } else {
      const updated = this.userRepository.update(this.employee.uid, formData)
      this.messageService.send('application', 'employee', 'update', updated)
    }
  }

  toList(): void {
    this.router.navigate(['..'])
  }

  private createUserForm(employee?: Employee): FormGroup {
    return this.userForm = this.formBuilder.nonNullable.group({
      bereich: this.formBuilder.nonNullable.control(employee?.bereich ?? ''),
      lastName: this.formBuilder.nonNullable.control(employee?.lastName ?? ''),
      name: this.formBuilder.nonNullable.control(employee?.name ?? ''),
      project: this.formBuilder.nonNullable.control(employee?.project ?? '')
    })
  }
}
