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

  getByMoneyOutputDate(date:Date): Observable<ListResponseModel<MoneyOutputDetailsDto>> {
    let newPath = this.apiUrl + 'MoneyOutput/GetByMoneyOutputDate?date='+date;
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
