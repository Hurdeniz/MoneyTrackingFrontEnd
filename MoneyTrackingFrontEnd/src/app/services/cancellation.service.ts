import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cancellation } from '../models/cancellation';
import { CancellationDetailsDto } from '../models/Dtos/cancellationDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CancellationService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllCancellationDetailByDate(startDate:string , endDate:string): Observable<ListResponseModel<CancellationDetailsDto>> {
    let newPath = this.apiUrl + 'Cancellation/GetAllCancellationDetailByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<CancellationDetailsDto>>(newPath);
  }

  add(cancellation: Cancellation):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Cancellation/Add',cancellation)
  }

  update(cancellation: Cancellation):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Cancellation/Update',cancellation)
  }

  delete(cancellation: Cancellation):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Cancellation/Delete',cancellation)
  }
}
