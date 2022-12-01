import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { StaffEpisode } from '../models/staffEpisode';

@Injectable({
  providedIn: 'root'
})
export class StaffEpisodeService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ListResponseModel<StaffEpisode>> {
    let newPath = this.apiUrl + 'StaffEpisode/GetAll';
    return this.httpClient.get<ListResponseModel<StaffEpisode>>(newPath);
  }

  add(staffEpisode: StaffEpisode):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'StaffEpisode/Add',staffEpisode)
  }

  update(staffEpisode: StaffEpisode):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'StaffEpisode/Update',staffEpisode)
  }

  delete(staffEpisode: StaffEpisode):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'StaffEpisode/Delete',staffEpisode)
  }
}
