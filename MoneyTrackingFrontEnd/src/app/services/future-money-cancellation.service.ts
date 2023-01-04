import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FutureMoneyCancellationDetailsDto } from '../models/Dtos/futureMoneyCancellationDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FutureMoneyCancellationService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllFutureMoneyCancellationDetail(): Observable<ListResponseModel<FutureMoneyCancellationDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoneyCancellation/GetAllFutureMoneyCancellationDetail';
    return this.httpClient.get<ListResponseModel<FutureMoneyCancellationDetailsDto>>(newPath);
  }

  getAllFutureMoneyCancellationByDateGroupByCustomer(date:string): Observable<ListResponseModel<FutureMoneyCancellationDetailsDto>> {
    let newPath = this.apiUrl + 'FutureMoneyCancellation/GetAllFutureMoneyCancellationByDateGroupByCustomer?date='+date;
    return this.httpClient.get<ListResponseModel<FutureMoneyCancellationDetailsDto>>(newPath);
  }

  add(futureMoneyCancellation: FutureMoneyCancellationDetailsDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoneyCancellation/Add',futureMoneyCancellation)
  }

  delete(futureMoneyCancellation: FutureMoneyCancellationDetailsDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'FutureMoneyCancellation/Delete',futureMoneyCancellation)
  }

}
