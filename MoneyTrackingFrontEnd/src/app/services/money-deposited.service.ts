import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoneyDepositedDetailsDto } from '../models/Dtos/moneyDepositedDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { MoneyDeposited } from '../models/moneyDeposited';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MoneyDepositedService {


  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }


  getAllMoneyDepositedDetail(): Observable<ListResponseModel<MoneyDepositedDetailsDto>> {
    let newPath = this.apiUrl + 'MoneyDeposited/GetAllMoneyDepositedDetail';
    return this.httpClient.get<ListResponseModel<MoneyDepositedDetailsDto>>(newPath);
  }

  getAllMoneyDepositedDetailByDate(startDate:string , endDate:string): Observable<ListResponseModel<MoneyDepositedDetailsDto>> {
    let newPath = this.apiUrl + 'MoneyDeposited/GetAllMoneyDepositedDetailByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<MoneyDepositedDetailsDto>>(newPath);
  }

  add(moneyDeposited: MoneyDeposited):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MoneyDeposited/Add',moneyDeposited)
  }

  update(moneyDeposited: MoneyDeposited):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MoneyDeposited/Update',moneyDeposited)
  }

  delete(moneyDeposited: MoneyDeposited):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MoneyDeposited/Delete',moneyDeposited)
  }
}
