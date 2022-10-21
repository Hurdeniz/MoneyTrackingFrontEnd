import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getBanks(): Observable<ListResponseModel<Bank>> {
    let newPath = this.apiUrl + 'Bank/getall';
    return this.httpClient.get<ListResponseModel<Bank>>(newPath);
  }
}
