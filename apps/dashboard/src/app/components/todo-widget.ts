import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Todo, TodoDataSource } from '@app/domain';
import { ApplicationService, MessageService } from '@electrodesk/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard-todo-widget',
  templateUrl: 'todo-widget.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class TodoWidgetComponent {

  public todo$: Observable<readonly Todo[]>;

  private todoAppId?: string;

  constructor(
    private readonly messageService: MessageService,
    private readonly applicationService: ApplicationService,
    private readonly todoDatasource: TodoDataSource
  ) {
    this.todo$ = this.todoDatasource.connect()
  }

  public async editTodo(todo: Todo): Promise<void> {
    const response = await this.applicationService.open('http://localhost:4201', {
      view: 'edit',
      uid: todo.uid
    })

    console.dir(response.code)
  }
}
