import { Application } from "../entity/Applikation.entity";

export const Applications: Application[] = [
  {
    id: 'ping',
    description: 'App to sends a Ping, will it be heard?',
    icon: '/assets/img/ping.png',
    name: 'Ping App',
    url: 'http://localhost:4201'
  },
  {
    id: 'employes',
    description: 'App to show employes',
    icon: '/assets/img/employees.svg',
    name: 'Employes',
    url: 'http://localhost:4202'
  }
]
