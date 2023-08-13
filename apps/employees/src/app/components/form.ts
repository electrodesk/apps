import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employee, EmployeeRepository } from '@app/domain';
import { EmployeState } from '../model/user-state';

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
    private readonly userState: EmployeState
  ) {
    this.userForm = this.createUserForm()
  }

  ngOnInit(): void {
    const user = this.userState.selected()
    if (user) {
      this.userForm.patchValue(user)
    }
  }

  save(): void {
    const user = this.userState.selected()
    const formData = this.userForm.getRawValue()

    if (!user) {
      this.userRepository.insert(formData)
    } else {
      this.userRepository.update(user.uid, formData)
    }

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
