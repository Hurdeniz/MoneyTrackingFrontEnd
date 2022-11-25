import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
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
import { MatLegacyInput as MatInput } from '@angular/material/legacy-input';
import { ResearchListFilterComponent } from './research-list-filter/research-list-filter.component';
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
    'description',
    'action'
  ];

  dataSource: MatTableDataSource<ShipmentListDetailsDto> =
  new MatTableDataSource<ShipmentListDetailsDto>();
 dataLoaded = false;
 searchHide = false;
 isAuthenticated: boolean = false;
 filterText: '';
 userId: number;
 dateNow: FormControl;
 dateInput: any;
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 startDate = moment().format('YYYY-MM-DD');
 endDate = moment().format('YYYY-MM-DD');
 status:boolean=false;
 @ViewChild('customerCode') nameInput: MatInput;
 shipmentNumber:number=1;


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
    this.dateNow = new FormControl(
      moment().format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
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
  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.startDate = date.format('YYYY-MM-DD');
    this.endDate = date.format('YYYY-MM-DD');
    this.shipmentListForm.controls['date'].setValue(this.dateInput);
    this.shipmentListForm.controls['shipmentNumber'].setValue(1);
    this.getAllShipmentListDetailByStatusAndDate();
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
      userId: [this.userId],
      shipmentNumber: [this.shipmentNumber],
      customerCode: ['', Validators.required],
      customerNameSurname: ['', Validators.required],
      promissoryNumber: ['', Validators.required],
      adress: [''],
      date: [this.dateInput, Validators.required],
      result: [''],
      description:[''],
      status: [this.status],
    });
}

add()
{
  if (this.shipmentListForm.valid) {
    let shipmentListModel = Object.assign({}, this.shipmentListForm.value);
    this.shipmentService.add(shipmentListModel).subscribe(
      (response) => {

        this.toastrService.success(response.message, 'Başarılı');
        this.shipmentListForm.controls['customerCode'].setValue('');
        this.shipmentListForm.controls['customerNameSurname'].setValue('');
        this.shipmentListForm.controls['promissoryNumber'].setValue('');
        this.shipmentListForm.controls['description'].setValue('');
        this.nameInput.focus();
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

deneme(){
  let shipmentListModel = Object.assign({}, this.shipmentListForm.value);
  let a = shipmentListModel.shipmentNumber
  this.shipmentNumber=a+1;
  this.shipmentListForm.controls['shipmentNumber'].setValue(this.shipmentNumber);
  console.log(this.shipmentNumber);
}

openFilterDialog() {
  this.dialog
    .open(ResearchListFilterComponent, {
      width: '20%',
    })
    .afterClosed()
    .subscribe((value) => {
      this.startDate = value.startDate.format('YYYY-MM-DD');
      this.endDate = value.endDate.format('YYYY-MM-DD');
      this.getAllShipmentListDetailByStatusAndDate();
    });
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

exportXlsx() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
  let element = document.getElementById('researchListTable');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sor Listesi');

  XLSX.writeFile(wb, 'Sor Listesi.xlsx');
}



}
