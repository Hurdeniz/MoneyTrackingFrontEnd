import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Satisfaction } from '../models/satisfaction';

@Injectable({
  providedIn: 'root'
})
export class SatisfactionService {

  constructor(
  @Inject('apiUrl') private apiUrl:string,
  private httpClient: HttpClient) { }


  getAllSatisfactionDetailByDate(startDate:string , endDate:string): Observable<ListResponseModel<Satisfaction>> {
    let newPath = this.apiUrl + 'Satisfaction/GetAllSatisfactionDetailByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<Satisfaction>>(newPath);
  }

  add(satisfaction: Satisfaction):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Satisfaction/Add',satisfaction)
  }

  update(satisfaction: Satisfaction):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Satisfaction/Update',satisfaction)
  }

  delete(satisfaction: Satisfaction):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Satisfaction/Delete',satisfaction)
  }
}
