import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardPayment } from '../models/cardPayment';
import { CardPaymetDetailsDto } from '../models/Dtos/cardPaymentDetailsDto';
import { CardPaymentGroupByBankNameDto } from '../models/Dtos/cardPaymentGroupByBankNameDto';
import { Count } from '../models/Dtos/count';
import { Sum } from '../models/Dtos/sum';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardPaymentService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllCardPaymentDetailByUserIdAndDate(userId:number , startDate:string , endDate:string): Observable<ListResponseModel<CardPaymetDetailsDto>> {
    let newPath = this.apiUrl + 'CardPayment/GetAllCardPaymentDetailByUserIdAndDate?userId='+userId+'&startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<CardPaymetDetailsDto>>(newPath);
  }

  getAllCardPaymentsByDateGroupByBankName(date:string): Observable<ListResponseModel<CardPaymentGroupByBankNameDto>>{
    let newPath = this.apiUrl + 'CardPayment/GetAllCardPaymentsByDateGroupByBankName?date='+date;
    return this.httpClient.get<ListResponseModel<CardPaymentGroupByBankNameDto>>(newPath);
  }

  getCountByDate(date:string): Observable<SingleResponseModel<Count>> {
    let newPath = this.apiUrl + 'CardPayment/GetCountByDate?date='+date ;
    return this.httpClient.get<SingleResponseModel<Count>>(newPath);
  }

  getSumByDateAndUser(date:string , userId:number): Observable<SingleResponseModel<Sum>> {
    let newPath = this.apiUrl + 'CardPayment/GetSumByDateAndUser?date='+date+'&userId='+userId ;
    return this.httpClient.get<SingleResponseModel<Sum>>(newPath);
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
