import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffDetailsDto } from '../models/Dtos/staffDetailsDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }


  getAllStaffDetailByStatus(status:boolean): Observable<ListResponseModel<StaffDetailsDto>> {
    let newPath = this.apiUrl + 'Staff/GetAllStaffDetailByStatus?status='+status;
    return this.httpClient.get<ListResponseModel<StaffDetailsDto>>(newPath);
  }

  add(staff: Staff):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Staff/Add',staff)
  }

  update(staff: Staff):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Staff/Update',staff)
  }

  delete(staff: Staff):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Staff/Delete',staff)
  }
}
