import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ShipmentResearchListFilterComponent } from './shipment-research-list-filter/shipment-research-list-filter.component';
const moment = _moment;

@Component({
  selector: 'app-shipment-research-list',
  templateUrl: './shipment-research-list.component.html',
  styleUrls: ['./shipment-research-list.component.scss']
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
    'result'

  ];

  displayedColumnsResearch: string[] = [
    'date',
    'shipmentNumber',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'description'
  ];

  dataSourceResearch: MatTableDataSource<ShipmentListDetailsDto> =
  new MatTableDataSource<ShipmentListDetailsDto>();
  dataSourceShipment: MatTableDataSource<ShipmentListDetailsDto> =
  new MatTableDataSource<ShipmentListDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  statusShipment: boolean = true;
  statusResearch: boolean = false;

  constructor(
    private shipmentService: ShipmentListService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
  ) { }

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

          this.researchListDetailDto = response.data;

          this.dataSourceShipment = new MatTableDataSource<ShipmentListDetailsDto>(
            this.researchListDetailDto
          );
          this.dataSourceShipment.paginator = this.paginator;
          this.dataSourceShipment.sort = this.sort;
          this.dataLoaded = true;
        },
        (responseError) => {
          this.toastrService.error(responseError.data.message, 'Dikkat');
        }
      );
  }

  getAllResearchListDetailByStatusAndDate() {

    this.shipmentService.getAllShipmentListDetailByStatusAndDate(this.statusResearch,this.startDate,this.endDate).subscribe(
      (response) => {
        this.shipmentListDetailDto = response.data;
        this.dataSourceResearch = new MatTableDataSource<ShipmentListDetailsDto>(
          this.shipmentListDetailDto
        );
        this.dataSourceResearch.paginator = this.paginator;
        this.dataSourceResearch.sort = this.sort;
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
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        if(value==undefined)
        {
          this.getAllShipmentListDetailByStatusAndDate();
          this.getAllResearchListDetailByStatusAndDate();

      }
        else{
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllShipmentListDetailByStatusAndDate();
          this.getAllResearchListDetailByStatusAndDate();
        }

      });
  }

  exportXlsx() {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
    let element = document.getElementById('shipmentListTable');
    let element2 = document.getElementById('researchListTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element2);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws , 'Sevkiyat Listesi');

    XLSX.writeFile(wb, 'Sevkiyat Listesi.xlsx');
  }

}
