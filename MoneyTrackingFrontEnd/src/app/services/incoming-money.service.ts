import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomingMoneyDetailsDto } from '../models/Dtos/incomingMoneyDetailsDto';
import { IncomingMoneyGroupByCustomerDto } from '../models/Dtos/incomingMoneyGroupByCustomerDto';
import { IncomingMoney } from '../models/incomingMoney';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class IncomingMoneyService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllIncomingMoneyDetail(): Observable<ListResponseModel<IncomingMoneyDetailsDto>> {
    let newPath = this.apiUrl + 'IncomingMoney/GetAllIncomingMoneyDetail';
    return this.httpClient.get<ListResponseModel<IncomingMoneyDetailsDto>>(newPath);
  }

  getAllIncomingMoneyByDateGroupByCustomer(date:string): Observable<ListResponseModel<IncomingMoneyGroupByCustomerDto>> {
    let newPath = this.apiUrl + 'IncomingMoney/GetAllIncomingMoneyByDateGroupByCustomer?date='+date;
    return this.httpClient.get<ListResponseModel<IncomingMoneyGroupByCustomerDto>>(newPath);
  }

  add(incomingMoney: IncomingMoneyDetailsDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'IncomingMoney/Add',incomingMoney)
  }

  delete(incomingMoney: IncomingMoneyDetailsDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'IncomingMoney/Delete',incomingMoney)
  }

}
