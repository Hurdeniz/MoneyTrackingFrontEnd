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
const moment = _moment;

@Component({
  selector: 'app-shipment-list-result',
  templateUrl: './shipment-list-result.component.html',
  styleUrls: ['./shipment-list-result.component.scss'],
})
export class ShipmentListResultComponent {
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

  constructor(
    private shipmentService: ShipmentListService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllShipmentListDetailByStatusAndDate();
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
        width: '20%',
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
        width: '20%',
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
