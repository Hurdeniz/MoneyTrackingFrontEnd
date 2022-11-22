import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ResearchListDeleteComponent } from './research-list-delete/research-list-delete.component';
import { ResearchListViewComponent } from './research-list-view/research-list-view.component';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;
@Component({
  selector: 'app-research-list',
  templateUrl: './research-list.component.html',
  styleUrls: ['./research-list.component.scss']
})
export class ResearchListComponent implements OnInit {
  shipmentListDetailDto:ShipmentListDetailsDto[]=[];
  shipmentListForm: FormGroup;
  displayedColumns: string[] = [
    'date',
    'shipmentNumber',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'status',
    'action'
  ];

  dataSource: MatTableDataSource<ShipmentListDetailsDto> =
  new MatTableDataSource<ShipmentListDetailsDto>();
 dataLoaded = false;
 searchHide = false;
 isAuthenticated: boolean = false;
 filterText: '';
 userId: number;
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 startDate = moment().format('YYYY-MM-DD');
 endDate = moment().format('YYYY-MM-DD');
 status:boolean=false;


  constructor(
    private shipmentService:ShipmentListService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllShipmentListDetailByStatusAndDate();
    this.createShipmentListForm();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
    }
  }

  getAllShipmentListDetailByStatusAndDate() {
    this.shipmentService.getAllShipmentListDetailByStatusAndDate(this.status,this.startDate,this.endDate).subscribe(
      (response) => {
        this.showSpinner();
        this.shipmentListDetailDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<ShipmentListDetailsDto>(
          this.shipmentListDetailDto
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoaded = true;

      },
      (responseError) => {
        this.toastrService.error(responseError.data.message, 'Dikkat');
      }
    );
  }

  createShipmentListForm() {
    this.shipmentListForm = this.formBuilder.group({
      userId:[this.userId],
      shipmentNumber:[''],
      customerCode:[''],
      customerNameSurname:[''],
      promissoryNumber:[''],
      date:[''],
      status: [''],
    });
}

add()
{
  if (this.shipmentListForm.valid) {
    let shipmentListModel = Object.assign({}, this.shipmentListForm.value);
    this.shipmentService.add(shipmentListModel).subscribe(
      (response) => {

        this.toastrService.success(response.message, 'Başarılı');
        this.shipmentListForm.reset();
        this.getAllShipmentListDetailByStatusAndDate();

      },
      (responseError) => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      }
    );
  } else {
    this.toastrService.error('Formunuz Eksik', 'Dikkat');
  }

}

openEditDialog(row: any) {
  this.dialog
    .open(ResearchListViewComponent, {
      width: '25%',
      data: row,
    })
    .afterClosed()
    .subscribe((value) => {
      if (value === 'update') {
        this.getAllShipmentListDetailByStatusAndDate();
      }
    });
}


openDeleteDialog(row: any) {
  this.dialog
    .open(ResearchListDeleteComponent, {
      width: '25%',
      data: row,
    })
    .afterClosed()
    .subscribe((value) => {
      if (value === 'delete') {
        this.getAllShipmentListDetailByStatusAndDate();
      }
    });
}



}
