import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { Team } from '@app/domain';

@Injectable({providedIn: 'root'})
export class ListState {

  private selectionModel = new SelectionModel<Team>(true)

  selected(): Team[] {
    return this.selectionModel.selected
  }

  isSelected(team: Team): boolean {
    return this.selectionModel.isSelected(team)
  }

  select(team: Team): void {
    this.selectionModel.toggle(team)
  }
}
