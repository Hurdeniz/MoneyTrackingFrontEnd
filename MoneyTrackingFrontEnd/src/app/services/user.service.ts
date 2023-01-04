import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForAddDto } from '../models/Dtos/userForAddDto';
import { UserForPasswordUpdateDto } from '../models/Dtos/userForPasswordUpdateDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
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

  add(userForAddDto: UserForAddDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'User/Add', userForAddDto)
  }

  updatePassword(userForPasswordUpdateDto: UserForPasswordUpdateDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'User/UpdatePassword', userForPasswordUpdateDto)
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'User/Update', user)
  }

  delete(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'User/Delete', user)
  }
}
