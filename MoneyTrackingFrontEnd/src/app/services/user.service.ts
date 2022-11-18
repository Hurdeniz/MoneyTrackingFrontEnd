import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }


  getAllUserByStatus(status:boolean): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'User/GetAllUserByStatus?status='+status;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
}
