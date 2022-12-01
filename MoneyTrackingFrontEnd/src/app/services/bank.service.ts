import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<Bank>> {
    let newPath = this.apiUrl + 'Bank/GetAll';
    return this.httpClient.get<ListResponseModel<Bank>>(newPath);
  }

  add(bank: Bank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Bank/Add',bank)
  }

  update(bank: Bank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Bank/Update',bank)
  }

  delete(bank: Bank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Bank/Delete',bank)
  }
}
