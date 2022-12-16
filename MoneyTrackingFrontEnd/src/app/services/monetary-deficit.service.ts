import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { MonetaryDeficit } from '../models/monetaryDeficit';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MonetaryDeficitService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<MonetaryDeficit>> {
    let newPath = this.apiUrl + 'MonetaryDeficit/GetAll'
    return this.httpClient.get<ListResponseModel<MonetaryDeficit>>(newPath);
  }

  add(monetaryDeficit: MonetaryDeficit):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MonetaryDeficit/Add',monetaryDeficit)
  }

  update(monetaryDeficit: MonetaryDeficit):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MonetaryDeficit/Update',monetaryDeficit)
  }

  delete(monetaryDeficit: MonetaryDeficit):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'MonetaryDeficit/Delete',monetaryDeficit)
  }

}
