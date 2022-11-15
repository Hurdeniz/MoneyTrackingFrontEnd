import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentralPay } from '../models/centralPay';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CentralPayService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllCentralPayDetailByDate(startDate:string , endDate:string): Observable<ListResponseModel<CentralPay>> {
    let newPath = this.apiUrl + 'CentralPay/GetAllCentralPayDetailByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<CentralPay>>(newPath);
  }

  add(centralPay: CentralPay):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CentralPay/Add',centralPay)
  }

  update(centralPay: CentralPay):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CentralPay/Update',centralPay)
  }

  delete(centralPay: CentralPay):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CentralPay/Delete',centralPay)
  }



}
