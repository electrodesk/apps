import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employee, EmployeeRepository } from '@app/domain';
import { EmployeState } from '../model/user-state';
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
export class FormComponent implements OnInit {

  public userForm: ModelFormGroup<Omit<Employee, 'uid'>>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userRepository: EmployeeRepository,
    private readonly userState: EmployeState,
    @Inject('ElectronMessageService') private readonly messageService: MessageService
  ) {
    this.userForm = this.createUserForm()
  }

  ngOnInit(): void {
    const user = this.userState.selected()
    if (user) {
      this.userForm.patchValue(user)
    }
  }

  /**
   * TODO refactor logic should not be in component
   */
  save(): void {
    const user = this.userState.selected()
    const formData = this.userForm.getRawValue()

    if (!user) {
      const inserted = this.userRepository.insert(formData)
      this.messageService.send('application', 'employee', 'insert', inserted)
    } else {
      const updated = this.userRepository.update(user.uid, formData)
      this.messageService.send('application', 'employee', 'update', updated)
    }

    // send message
    this.toList()
  }

  toList(): void {
    this.router.navigate(['..'])
  }

  private createUserForm(): FormGroup {
    return this.userForm = this.formBuilder.nonNullable.group({
      bereich: this.formBuilder.nonNullable.control(''),
      lastName: this.formBuilder.nonNullable.control(''),
      name: this.formBuilder.nonNullable.control(''),
      project: this.formBuilder.nonNullable.control('')
    })
  }
}
