import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerPay } from '../models/customerPay';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerPayService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllCustomerPayDetailByDate(startDate:string , endDate:string): Observable<ListResponseModel<CustomerPay>> {
    let newPath = this.apiUrl + 'CustomerPay/GetAllCustomerPayDetailByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<CustomerPay>>(newPath);
  }

  add(customerPay: CustomerPay):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CustomerPay/Add',customerPay)
  }

  update(customerPay: CustomerPay):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CustomerPay/Update',customerPay)
  }

  delete(customerPay: CustomerPay):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CustomerPay/Delete',customerPay)
  }

}
