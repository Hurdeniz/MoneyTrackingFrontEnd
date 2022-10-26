import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FutureMoneyDetailsDto } from '../models/Dtos/futureMoneyDetailsDto';
import { FutureMoney } from '../models/futureMoney';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FutureMoneyService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllFutureMoneyDetailByUserId(userId:number): Observable<ListResponseModel<FutureMoneyDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyDetailByUserId?userId='+userId;
    return this.httpClient.get<ListResponseModel<FutureMoneyDetailsDto>>(newPath);
  }

  getAllFutureMoneyDetailStatus(status:boolean): Observable<ListResponseModel<FutureMoneyDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyDetailStatus?status='+status;
    return this.httpClient.get<ListResponseModel<FutureMoneyDetailsDto>>(newPath);
  }

  getAllFutureMoneyDetailStatusUser(userId:number,status:boolean): Observable<ListResponseModel<FutureMoneyDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyDetailStatusUser?userId='+userId+'&status='+status
    return this.httpClient.get<ListResponseModel<FutureMoneyDetailsDto>>(newPath);
  }

  add(futureMoney: FutureMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoney/Add',futureMoney)
  }

  update(futureMoney: FutureMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoney/Update',futureMoney)
  }

  delete(futureMoney: FutureMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoney/Delete',futureMoney)
  }
}
