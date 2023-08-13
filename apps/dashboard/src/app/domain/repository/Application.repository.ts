import { Injectable, signal } from '@angular/core';
import { Application } from '../entity/Applikation.entity'
import { Applications } from '../data/Applications';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRepository {
  applications = signal<Application[]>(Applications)
}
