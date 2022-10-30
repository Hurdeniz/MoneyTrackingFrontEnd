import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { StaffTask } from '../models/staffTask';

@Injectable({
  providedIn: 'root'
})
export class StaffTaskService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<StaffTask>> {
    let newPath = this.apiUrl + 'StaffTask/GetAll';
    return this.httpClient.get<ListResponseModel<StaffTask>>(newPath);
  }
}
