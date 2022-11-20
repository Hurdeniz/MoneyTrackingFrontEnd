import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomingMoney } from '../models/incomingMoney';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class IncomingMoneyService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  add(incomingMoney: IncomingMoney):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'IncomingMoney/Add',incomingMoney)
  }

}
