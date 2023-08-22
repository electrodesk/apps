export interface EmployeeReadDTO {
  uid: number

  name: string

  lastName: string

  bereich: string

  project: string
}

export interface Employee extends Omit<EmployeeReadDTO, 'uid'> {
  uid?: EmployeeReadDTO['uid']
}
