import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTotalsDto } from '../models/Dtos/getTotalsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SafeBox } from '../models/safeBox';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SafeBoxService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) { }


  getAllSafeBoxByDate(startDate:string , endDate:string): Observable<ListResponseModel<SafeBox>>{
    let newPath = this.apiUrl + 'SafeBox/GetAllSafeBoxByDate?startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<SafeBox>>(newPath);
  }

  totalsByDay(date:string): Observable<SingleResponseModel<GetTotalsDto>> {
    let newPath = this.apiUrl + 'SafeBox/TotalsByDay?date='+date ;
    return this.httpClient.get<SingleResponseModel<GetTotalsDto>>(newPath);
  }

  add(safeBox: SafeBox):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'SafeBox/Add',safeBox)
  }

  update(safeBox: SafeBox):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'SafeBox/Update',safeBox)
  }

  delete(safeBox: SafeBox):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'SafeBox/Delete',safeBox)
  }


}
