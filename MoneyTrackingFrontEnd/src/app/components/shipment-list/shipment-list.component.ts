import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShipmentListDeleteComponent } from './shipment-list-delete/shipment-list-delete.component';
import { ShipmentListViewComponent } from './shipment-list-view/shipment-list-view.component';
import { ShipmentListFilterComponent } from './shipment-list-filter/shipment-list-filter.component';
import { AuthService } from 'src/app/services/auth.service';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss'],
})
export class ShipmentListComponent implements OnInit {
  shipmentListDetailDto: ShipmentListDetailsDto[] = [];
  shipmentListForm: FormGroup;
  displayedColumns: string[] = [
    'date',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'adress',
    'action',
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
  startDate = moment().add('1','days').format('YYYY-MM-DD');
  endDate = moment().add('1','days').format('YYYY-MM-DD');
  status: boolean = true;
  @ViewChild('customerCode') nameInput: MatInput;

  constructor(
    private shipmentService: ShipmentListService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.dateNow = new FormControl(
      moment().add('1','days').format('YYYY-MM-DD'),
      Validators.required
    );
    this.dateInput = this.dateNow.value;
    this.getAllShipmentListDetailByStatusAndDate();
    this.createShipmentListForm();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  addEvent(event: any) {
    let date: Moment = event.value;
    this.dateInput = date.format('YYYY-MM-DD');
    this.startDate = date.format('YYYY-MM-DD');
    this.endDate = date.format('YYYY-MM-DD');
    this.shipmentListForm.controls['date'].setValue(this.dateInput);
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
    this.shipmentService
      .getAllShipmentListDetailByStatusAndDate(
        this.status,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.shipmentListDetailDto = response.data;
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
      shipmentNumber: ['0'],
      customerCode: ['', Validators.required],
      customerNameSurname: ['', Validators.required],
      promissoryNumber: ['', Validators.required],
      adress: [''],
      date: [this.dateInput, Validators.required],
      result: [''],
      description: [''],
      status: [this.status],
    });
  }

  add() {
    debugger
    if (this.shipmentListForm.valid) {
      let shipmentListModel = Object.assign({}, this.shipmentListForm.value);
      this.shipmentService.add(shipmentListModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.shipmentListForm.reset();
          this.nameInput.focus();
          this.createShipmentListForm();
          this.getAllShipmentListDetailByStatusAndDate();
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
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

  openFilterDialog() {
    this.dialog
      .open(ShipmentListFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllShipmentListDetailByStatusAndDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllShipmentListDetailByStatusAndDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(ShipmentListViewComponent, {
        width: '400px',
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
      .open(ShipmentListDeleteComponent, {
        width: '450px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllShipmentListDetailByStatusAndDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('shipmentListTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sevkiyat Listesi');
    XLSX.writeFile(wb, 'Sevkiyat Listesi.xlsx');
  }
}
