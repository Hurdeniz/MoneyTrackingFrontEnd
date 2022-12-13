import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoneyOutputDetailsDto } from '../models/Dtos/moneyOutputDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { MoneyOutput } from '../models/moneyOutput';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MoneyOutputService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllMoneyOutputDetailByUserIdAndDate(userId:number , startDate:string , endDate:string): Observable<ListResponseModel<MoneyOutput>> {
    let newPath = this.apiUrl + 'MoneyOutput/GetAllMoneyOutputDetailByUserIdAndDate?userId='+userId+'&startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<MoneyOutput>>(newPath);
  }

  getAllMoneyOutputDetailByDate(startDate:string , endDate:string): Observable<ListResponseModel<MoneyOutputDetailsDto>> {
    let newPath = this.apiUrl + 'MoneyOutput/GetAllMoneyOutputDetailByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<MoneyOutputDetailsDto>>(newPath);
  }

  getAllMoneyOutputDetailByDay(day:string): Observable<ListResponseModel<MoneyOutputDetailsDto>> {
    let newPath = this.apiUrl + 'MoneyOutput/GetAllMoneyOutputDetailByDay?day='+day;
    return this.httpClient.get<ListResponseModel<MoneyOutputDetailsDto>>(newPath);
  }

  add(moneyOutput: MoneyOutput):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MoneyOutput/Add',moneyOutput)
  }

  update(moneyOutput: MoneyOutput):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MoneyOutput/Update',moneyOutput)
  }

  delete(moneyOutput: MoneyOutput):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MoneyOutput/Delete',moneyOutput)
  }
}
