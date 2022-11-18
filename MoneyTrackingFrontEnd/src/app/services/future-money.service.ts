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

  getAllFutureMoneyDetailByStatus(status:boolean): Observable<ListResponseModel<FutureMoneyDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyDetailByStatus?status='+status;
    return this.httpClient.get<ListResponseModel<FutureMoneyDetailsDto>>(newPath);
  }

  getAllFutureMoneyDetailByUserIdAndStatus(userId:number,status:boolean): Observable<ListResponseModel<FutureMoneyDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyDetailByUserIdAndStatus?userId='+userId+'&status='+status
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
