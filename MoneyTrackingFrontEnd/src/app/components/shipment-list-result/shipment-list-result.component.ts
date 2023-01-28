import { Component, ViewChild } from '@angular/core';
import { ShipmentListResultFilterComponent } from './shipment-list-result-filter/shipment-list-result-filter.component';
import { ShipmentListEnterResultComponent } from './shipment-list-enter-result/shipment-list-enter-result.component';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
const moment = _moment;

@Component({
  selector: 'app-shipment-list-result',
  templateUrl: './shipment-list-result.component.html',
  styleUrls: ['./shipment-list-result.component.scss'],
})
export class ShipmentListResultComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  shipmentListDetailDto: ShipmentListDetailsDto[] = [];
  displayedColumns: string[] = [
    'date',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'adress',
    'result',
    'action',
  ];
  dataSource: MatTableDataSource<ShipmentListDetailsDto> =
    new MatTableDataSource<ShipmentListDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  status: boolean = true;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;

  constructor(
    private shipmentService: ShipmentListService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllShipmentListDetailByStatusAndDate();
  }

  tokenAndUserControl() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let role = Object.keys(decode).filter((x) =>
        x.endsWith('/role')
      )[0];
      this.userRole = decode[role];
    }

    const arrayControl = Array.isArray(this.userRole);
    if (arrayControl == false) {
      if (this.userRole.toString() == 'Admin' || 'Staff' || 'Shipment' || 'Service' ) {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }

    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin' || element == 'Staff' || element == 'Shipment'|| element == 'Service') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }
        if (element == 'ShipmentList.Add') {
          this.add = true;
        }
        if (element == 'ShipmentList.Delete') {
          this.delete = true;
        }
        if (element == 'ShipmentList.Update') {
          this.update = true;
        }
        if (element == 'ShipmentList.GetAllShipmentListDetailByStatusAndDate') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
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

  openFilterDialog() {
    this.dialog
      .open(ShipmentListResultFilterComponent, {
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

  openEnterResultDialog(row: any) {
    this.dialog
      .open(ShipmentListEnterResultComponent, {
        width: '380px',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'result') {
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
