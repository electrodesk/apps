export interface TodoReadDTO {
  uid: number

  task: string

  completed: boolean
}

export interface Todo extends Omit<TodoReadDTO, 'uid'> {
  uid?: TodoReadDTO['uid']
}

