import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardPayment } from '../models/cardPayment';
import { CardPaymetDetailsDto } from '../models/Dtos/cardPaymentDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardPaymentService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllCardPaymentDetailByUserId(userId:number): Observable<ListResponseModel<CardPaymetDetailsDto>> {
    let newPath = this.apiUrl + 'CardPayment/GetAllCardPaymentDetailByUserId?userId='+userId;
    return this.httpClient.get<ListResponseModel<CardPaymetDetailsDto>>(newPath);
  }

  add(cardPayment: CardPayment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CardPayment/Add',cardPayment)
  }

  update(cardPayment: CardPayment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CardPayment/Update',cardPayment)
  }

  delete(cardPayment: CardPayment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CardPayment/Delete',cardPayment)
  }
}
