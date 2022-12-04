import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IncomingMoneyDetailsDto } from 'src/app/models/Dtos/incomingMoneyDetailDto';
import { IncomingMoneyService } from 'src/app/services/incoming-money.service';
import { IncomingMoneyDeleteComponent } from './incoming-money-delete/incoming-money-delete.component';
import { IncomingMoneyViewComponent } from './incoming-money-view/incoming-money-view.component';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-incoming-money',
  templateUrl: './incoming-money.component.html',
  styleUrls: ['./incoming-money.component.scss']
})
export class IncomingMoneyComponent implements OnInit {
  incomingMoneyDetailsDto: IncomingMoneyDetailsDto[] = [];
  displayedColumns: string[] = ['futureMoneyRegistrationDate','typeOfOperation' , 'customerCode', 'customerNameSurname','promissoryNumber','transactionAmount', 'incomingMoneyRegistrationDate','incomingAmount','inComingMoneyDescription', 'action'];
  dataSource: MatTableDataSource<IncomingMoneyDetailsDto> = new MatTableDataSource<IncomingMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private incomingMoneyService:IncomingMoneyService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllIncomingMoneyDetail();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  getTotalTransactionAmount() {
    return this.incomingMoneyDetailsDto.map(t => t.transactionAmount).reduce((acc, value) => acc + value, 0);
  }
  getTotalIncomingAmount() {
    return this.incomingMoneyDetailsDto.map(t => t.incomingAmount).reduce((acc, value) => acc + value, 0);
  }

  getAllIncomingMoneyDetail() {
    this.incomingMoneyService.getAllIncomingMoneyDetail().subscribe(
      (response) => {
        this.incomingMoneyDetailsDto = response.data;
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
        width: '30%',
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
    let element = document.getElementById('incomingMoneyTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelen Ödemeler');
    XLSX.writeFile(wb, 'Elden Gelen Ödemeler.xlsx');
  }


}
