import { Component, OnInit, ViewChild } from '@angular/core';
import { FutureMoneyDeleteComponent } from './future-money-delete/future-money-delete.component';
import { FutureMoneyViewComponent } from './future-money-view/future-money-view.component';
import { AuthService } from 'src/app/services/auth.service';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyDetailsDto } from 'src/app/models/Dtos/futureMoneyDetailsDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-future-money',
  templateUrl: './future-money.component.html',
  styleUrls: ['./future-money.component.scss']
})
export class FutureMoneyComponent implements OnInit {
  futureMoneyDetailsDto: FutureMoneyDetailsDto[] = [];
  displayedColumns: string[] = ['futureMoneyRegistrationDate','typeOfOperation' , 'customerCode', 'customerNameSurname','promissoryNumber','transactionAmount', 'amountPaid','futureAmount','description', 'action'];
  dataSource: MatTableDataSource<FutureMoneyDetailsDto> = new MatTableDataSource<FutureMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  status:boolean=true;
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userId: number;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;


  constructor(
    private futureMoneyService:FutureMoneyService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllFutureMoneyDetailByUserIdAndStatus();
  }

  tokenAndUserControl() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
      let role = Object.keys(decode).filter((x) =>
      x.endsWith('/role')
    )[0];
    this.userRole = decode[role];
    }

    const arrayControl = Array.isArray(this.userRole);
    if (arrayControl == false) {
      if (this.userRole.toString() == 'Admin') {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }
      if (this.userRole.toString() == 'Staff') {
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }
    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin' || element == 'Staff') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }
        if (element == 'FutureMoney.Add') {
          this.add = true;
        }
        if (element == 'FutureMoney.Delete') {
          this.delete = true;
        }
        if (element == 'FutureMoney.Update') {
          this.update = true;
        }
        if (element == 'FutureMoney.GetAllFutureMoneyDetailByUserIdAndStatus') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getTotalAmountPaid() {
    return this.futureMoneyDetailsDto.map(t => t.amountPaid).reduce((acc, value) => acc + value, 0);
  }
  getTotalTransactionAmount() {
    return this.futureMoneyDetailsDto.map(t => t.transactionAmount).reduce((acc, value) => acc + value, 0);
  }
  getTotalFutureAmount() {
    return this.futureMoneyDetailsDto.map(t => t.futureAmount).reduce((acc, value) => acc + value, 0);
  }

  getAllFutureMoneyDetailByUserIdAndStatus() {
    this.futureMoneyService.getAllFutureMoneyDetailByUserIdAndStatus(this.userId,this.status).subscribe(
      (response) => {
        this.futureMoneyDetailsDto = response.data;
        this.dataSource = new MatTableDataSource<FutureMoneyDetailsDto>(
          this.futureMoneyDetailsDto
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
      .open(FutureMoneyViewComponent, {
        width: '600px',
        data: { status: true, userId: this.userId }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllFutureMoneyDetailByUserIdAndStatus();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(FutureMoneyViewComponent, {
        width: '600px',
        data: { status: false, row }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllFutureMoneyDetailByUserIdAndStatus();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(FutureMoneyDeleteComponent, {
        width: '500px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllFutureMoneyDetailByUserIdAndStatus();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('futureMoneyTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Elden Gelecekler');
    XLSX.writeFile(wb, 'Elden Gelecek İşlemleri.xlsx');
  }
}
