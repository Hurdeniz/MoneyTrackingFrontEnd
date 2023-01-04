import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyCancellationDetailsDto } from 'src/app/models/Dtos/futureMoneyCancellationDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { FutureMoneyCancellationService } from 'src/app/services/future-money-cancellation.service';
import { FutureMoneyCancellationDeleteComponent } from './future-money-cancellation-delete/future-money-cancellation-delete.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-future-money-cancellation',
  templateUrl: './future-money-cancellation.component.html',
  styleUrls: ['./future-money-cancellation.component.scss']
})
export class FutureMoneyCancellationComponent {

  jwtHelper: JwtHelperService = new JwtHelperService();
  futureMoneyCancellationDetailsDto: FutureMoneyCancellationDetailsDto[] = [];
  displayedColumns: string[] = ['futureMoneyCancellationRegistrationDate', 'futureMoneyRegistrationDate', 'typeOfOperation', 'customerCode', 'customerNameSurname', 'promissoryNumber', 'futureMoneyCancellationAmount', 'futureMoneyCancellationDescription', 'action'];
  dataSource: MatTableDataSource<FutureMoneyCancellationDetailsDto> = new MatTableDataSource<FutureMoneyCancellationDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  delete: boolean = false;
  list: boolean = false;

  constructor(
    private futureMoneyCancellationService: FutureMoneyCancellationService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllFutureMoneyCancellationDetail();
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
      if (this.userRole.toString() == 'Admin') {
        this.delete = true;
        this.list = true;
      }
    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin') {
          this.delete = true;
          this.list = true;
        }
        if (element == 'FutureMoneyCancellation.Delete') {
          this.delete = true;
        }
        if (element == 'FutureMoneyCancellation.GetAllFutureMoneyCancellationDetail') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalIncomingAmount() {
    return this.futureMoneyCancellationDetailsDto.map(t => t.futureMoneyCancellationAmount).reduce((acc, value) => acc + value, 0);
  }


  getAllFutureMoneyCancellationDetail() {
    this.futureMoneyCancellationService.getAllFutureMoneyCancellationDetail().subscribe(
      (response) => {
        this.futureMoneyCancellationDetailsDto = response.data;
        this.dataSource = new MatTableDataSource<FutureMoneyCancellationDetailsDto>(
          this.futureMoneyCancellationDetailsDto
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

  openDeleteDialog(row: any) {
    this.dialog
      .open(FutureMoneyCancellationDeleteComponent, {
        width: '455px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllFutureMoneyCancellationDetail();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('futureMoneyCancellationTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelecek İptalleri');
    XLSX.writeFile(wb, 'Elden Gelecek İptal Olan İşlemler.xlsx');
  }



}
