import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FutureMoneyDetailsDto } from '../models/Dtos/futureMoneyDetailsDto';
import { FutureMoneyGroupByCustomerDto } from '../models/Dtos/futureMoneyGroupByCustomerNameDto';
import { Sum } from '../models/Dtos/sum';
import { FutureMoney } from '../models/futureMoney';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyDetailByUserIdAndStatus?userId='+userId+'&status='+status;
    return this.httpClient.get<ListResponseModel<FutureMoneyDetailsDto>>(newPath);
  }

  getAllFutureMoneyByDateGroupByCustomer(date:string): Observable<ListResponseModel<FutureMoneyGroupByCustomerDto>> {
    let newPath = this.apiUrl + 'FutureMoney/GetAllFutureMoneyByDateGroupByCustomer?date='+date;
    return this.httpClient.get<ListResponseModel<FutureMoneyGroupByCustomerDto>>(newPath);
  }

  getSumByDateAndUser(date:string , userId:number): Observable<SingleResponseModel<Sum>> {
    let newPath = this.apiUrl + 'FutureMoney/GetSumByDateAndUser?date='+date+'&userId='+userId ;
    return this.httpClient.get<SingleResponseModel<Sum>>(newPath);
  }

  add(futureMoney: FutureMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoney/Add',futureMoney);
  }

  update(futureMoney: FutureMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoney/Update',futureMoney);
  }

  delete(futureMoney: FutureMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoney/Delete',futureMoney);
  }
}
