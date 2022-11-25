import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CentralPay } from 'src/app/models/centralPay';
import { CentralPayService } from 'src/app/services/central-pay.service';
import { CentralPayDeleteComponent } from './central-pay-delete/central-pay-delete.component';
import { CentralPayViewComponent } from './central-pay-view/central-pay-view.component';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
import { CentralPayFilterComponent } from './central-pay-filter/central-pay-filter.component';
const moment = _moment;
@Component({
  selector: 'app-central-pay',
  templateUrl: './central-pay.component.html',
  styleUrls: ['./central-pay.component.scss']
})
export class CentralPayComponent implements OnInit {
  centralPay:CentralPay[]=[];
  displayedColumns: string[] = [
    'date',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<CentralPay> =
  new MatTableDataSource<CentralPay>();
 dataLoaded = false;
 searchHide = false;
 filterText: '';
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
 startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
 endDate = moment().format('YYYY-MM-DD');
  constructor(
    private centralPayService:CentralPayService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllCentralPayDetailByDate();
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


  getAllCentralPayDetailByDate() {
    this.centralPayService.getAllCentralPayDetailByDate(this.startDate,this.endDate).subscribe(
      (response) => {
        this.showSpinner();
        this.centralPay = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<CentralPay>(
          this.centralPay
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

  openAddDialog() {
    this.dialog
      .open(CentralPayViewComponent, {
        width: '25%',
        data: { status: true }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCentralPayDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CentralPayViewComponent, {
        width: '25%',
        data: { status: false, row }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCentralPayDetailByDate();
        }
      });
  }
  openFilterDialog() {
    this.dialog
      .open(CentralPayFilterComponent, {
        width: '20%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.startDate = value.startDate.format('YYYY-MM-DD');
        this.endDate = value.endDate.format('YYYY-MM-DD');
        this.getAllCentralPayDetailByDate();
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CentralPayDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCentralPayDetailByDate();
        }
      });
  }


  exportXlsx() {
    let element = document.getElementById('centralPayTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Merkez Ödemeleri');

    XLSX.writeFile(wb, 'Merkez Ödeme İşlemleri.xlsx');
  }



}
