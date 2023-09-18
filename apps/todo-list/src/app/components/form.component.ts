import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '@app/domain';

interface TodoForm {
  task: FormControl<Todo['task'] | null>
  completed: FormControl<Todo['completed'] | null>
}

@Component({
  selector: 'todo-form',
  templateUrl: 'form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class TodoFormComponent {

  public readonly form: FormGroup<TodoForm>

  private readonly todo: Todo

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.todo = this.activatedRoute.snapshot.data['todo']
    this.form = this.constructForm()
  }

  private constructForm(): FormGroup<TodoForm> {
    return this.formBuilder.group<TodoForm>({
      task: this.formBuilder.control(this.todo.task),
      completed: this.formBuilder.control(this.todo.completed)
    })
  }
}
