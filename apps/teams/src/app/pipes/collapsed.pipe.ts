import { Pipe, PipeTransform, inject } from '@angular/core';
import { Team } from '@app/domain';
import { ListState } from '../model/List.state';

@Pipe({
  name: 'teamsIsCollpased',
  pure: false,
  standalone: true
})
export class IsCollapsedPipe implements PipeTransform {

  private readonly listState = inject(ListState)

  transform(value: Team): boolean {
    return this.listState.isSelected(value) === false
  }
}
