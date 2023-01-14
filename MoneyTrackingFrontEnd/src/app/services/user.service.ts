import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForAddDto } from '../models/Dtos/userForAddDto';
import { UserForPasswordUpdateDto } from '../models/Dtos/userForPasswordUpdateDto';
import { UserMenuClaimsDto } from '../models/Dtos/userMenuClaimsDto';
import { UserOperationClaimsDto } from '../models/Dtos/userOperationClaimsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserMenuClaim } from '../models/userMenuClaim';
import { UserOperationClaim } from '../models/userOperationClaim';

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

  getAllUserOperationClaims(userId:any): Observable<ListResponseModel<UserOperationClaimsDto>> {
    let newPath = this.apiUrl + 'User/GetAllUserOperationClaims?userId='+userId;
    return this.httpClient.get<ListResponseModel<UserOperationClaimsDto>>(newPath);
  }

  getAllUserMenuClaims(userId:any): Observable<ListResponseModel<UserMenuClaimsDto>> {
    let newPath = this.apiUrl + 'User/GetAllUserMenuClaims?userId='+userId;
    return this.httpClient.get<ListResponseModel<UserMenuClaimsDto>>(newPath);
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

  updateOperationClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'UserOperation/Update', userOperationClaim)
  }

  updateMenuClaim(userMenuClaim: UserMenuClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'UserMenu/Update', userMenuClaim)
  }


}
