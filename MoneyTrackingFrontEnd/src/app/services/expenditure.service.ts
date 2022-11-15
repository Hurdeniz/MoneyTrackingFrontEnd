import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenditureDetailsDto } from '../models/Dtos/expenditureDetailsDto';
import { Expenditure } from '../models/expenditure';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAllExpenditureDetail(): Observable<ListResponseModel<ExpenditureDetailsDto>>{
    let newPath = this.apiUrl + 'Expenditure/GetAllExpenditureDetail';
    return this.httpClient.get<ListResponseModel<ExpenditureDetailsDto>>(newPath);
  }
  getAllExpenditureDetailByUserIdAndDate(userId:number, startDate:string , endDate:string): Observable<ListResponseModel<ExpenditureDetailsDto>> {
    let newPath = this.apiUrl + 'Expenditure/GetAllExpenditureDetailByUserIdAndDate?userId='+userId+'&startDate='+startDate+'&endDate='+endDate;
    return this.httpClient.get<ListResponseModel<ExpenditureDetailsDto>>(newPath);
  }

  add(expenditure: Expenditure):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Expenditure/Add',expenditure)
  }

  update(expenditure: Expenditure):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Expenditure/Update',expenditure)
  }

  delete(expenditure: Expenditure):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Expenditure/Delete',expenditure)
  }
}
