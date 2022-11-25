import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IncomingMoneyDetailsDto } from 'src/app/models/Dtos/incomingMoneyDetailDto';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';
import { IncomingMoneyDeleteComponent } from './incoming-money-delete/incoming-money-delete.component';
import { IncomingMoneyViewComponent } from './incoming-money-view/incoming-money-view.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-incoming-money',
  templateUrl: './incoming-money.component.html',
  styleUrls: ['./incoming-money.component.scss']
})
export class IncomingMoneyComponent implements OnInit {
  incomingMoneyDetailsDto: IncomingMoneyDetailsDto[] = [];
  displayedColumns: string[] = ['futureMoneyRegistrationDate','typeOfOperation' , 'customerCode', 'customerNameSurname','promissoryNumber','transactionAmount', 'incomingMoneyRegistrationDate','incomingAmount','description', 'action'];
  dataSource: MatTableDataSource<IncomingMoneyDetailsDto> = new MatTableDataSource<IncomingMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private incomingMoneyService:IncomingMoneyService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllIncomingMoneyDetail();
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

  getAllIncomingMoneyDetail() {
    this.incomingMoneyService.getAllIncomingMoneyDetail().subscribe(
      (response) => {
        this.showSpinner();
        this.incomingMoneyDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<IncomingMoneyDetailsDto>(
          this.incomingMoneyDetailsDto
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

  openEditDialog(row : any) {
    this.dialog
      .open(IncomingMoneyViewComponent, {
        width: '40%',
        data:row
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllIncomingMoneyDetail();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(IncomingMoneyDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllIncomingMoneyDetail();
        }
      });
  }

  exportXlsx() {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cardPaymnetDetailsDto) sadece data yazdırmak istersek
    let element = document.getElementById('incomingMoneyTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelen Ödemeler');

    XLSX.writeFile(wb, 'Elden Gelen Ödemeler.xlsx');
  }


}
