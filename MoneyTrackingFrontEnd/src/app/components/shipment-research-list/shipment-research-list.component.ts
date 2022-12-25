import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipmentResearchListFilterComponent } from './shipment-research-list-filter/shipment-research-list-filter.component';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-shipment-research-list',
  templateUrl: './shipment-research-list.component.html',
  styleUrls: ['./shipment-research-list.component.scss'],
})
export class ShipmentResearchListComponent implements OnInit {
  shipmentListDetailDto: ShipmentListDetailsDto[] = [];
  researchListDetailDto: ShipmentListDetailsDto[] = [];
  displayedColumnsShipment: string[] = [
    'date',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'adress',
    'result',
  ];
  displayedColumnsResearch: string[] = [
    'date',
    'shipmentNumber',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'description',
  ];
  dataSourceResearch: MatTableDataSource<ShipmentListDetailsDto> =
    new MatTableDataSource<ShipmentListDetailsDto>();
  dataSourceShipment: MatTableDataSource<ShipmentListDetailsDto> =
    new MatTableDataSource<ShipmentListDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginatorShipment: MatPaginator;
  @ViewChild(MatPaginator) paginatorResearch: MatPaginator;
  @ViewChild(MatSort) sortShipment: MatSort;
  @ViewChild(MatSort) sortResearch: MatSort;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  statusShipment: boolean = true;
  statusResearch: boolean = false;

  constructor(
    private shipmentService: ShipmentListService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllShipmentListDetailByStatusAndDate();
    this.getAllResearchListDetailByStatusAndDate();
  }
  filterDataSource() {
    this.dataSourceResearch.filter = this.filterText.trim().toLocaleLowerCase();
    this.dataSourceShipment.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getAllShipmentListDetailByStatusAndDate() {
    this.shipmentService
      .getAllShipmentListDetailByStatusAndDate(
        this.statusShipment,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.shipmentListDetailDto = response.data;
          this.dataSourceShipment =
            new MatTableDataSource<ShipmentListDetailsDto>(
              this.shipmentListDetailDto
            );
          this.dataSourceShipment.paginator = this.paginatorShipment;
          this.dataSourceShipment.sort = this.sortShipment;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  getAllResearchListDetailByStatusAndDate() {
    this.shipmentService
      .getAllShipmentListDetailByStatusAndDate(
        this.statusResearch,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.researchListDetailDto = response.data;
          this.dataSourceResearch =
            new MatTableDataSource<ShipmentListDetailsDto>(
              this.researchListDetailDto
            );
          this.dataSourceResearch.paginator = this.paginatorResearch;
          this.dataSourceResearch.sort = this.sortResearch;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  openFilterDialog() {
    this.dialog
      .open(ShipmentResearchListFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllShipmentListDetailByStatusAndDate();
          this.getAllResearchListDetailByStatusAndDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllShipmentListDetailByStatusAndDate();
          this.getAllResearchListDetailByStatusAndDate();
        }
      });
  }

  exportXlsx() {
    let shipment = document.getElementById('shipmentListTable');
    let research = document.getElementById('researchListTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(shipment);
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(research);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wb2: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sevkiyat Listesi');
    XLSX.utils.book_append_sheet(wb2, ws2, 'Sor Listesi');
    XLSX.writeFile(wb, 'Sevkiyat Listesi.xlsx');
    XLSX.writeFile(wb2, 'Sor Listesi Listesi.xlsx');
  }
}
