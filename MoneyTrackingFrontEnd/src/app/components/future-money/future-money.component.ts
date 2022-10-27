import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FutureMoneyDetailsDto } from 'src/app/models/Dtos/futureMoneyDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { FutureMoneyDeleteComponent } from './future-money-delete/future-money-delete.component';
import { FutureMoneyViewComponent } from './future-money-view/future-money-view.component';

@Component({
  selector: 'app-future-money',
  templateUrl: './future-money.component.html',
  styleUrls: ['./future-money.component.scss']
})
export class FutureMoneyComponent implements OnInit {
  futureMoneyDetailsDto: FutureMoneyDetailsDto[] = [];
  displayedColumns: string[] = ['futureMoneyRegistrationDate','typeOfOperation' , 'customerCode', 'customerName','promissoryNoteNumber','transactionAmount', 'amountPaid','futureAmount','description', 'action'];
  dataSource: MatTableDataSource<FutureMoneyDetailsDto> = new MatTableDataSource<FutureMoneyDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  userName: string;
  status:boolean=true;
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private futureMoneyService:FutureMoneyService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllFutureMoneyDetailStatusUser(this.userId,this.status);
  }

  filterCardPayments() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
      this.userName = decode[userName];
    }
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }


  getAllFutureMoneyDetailStatusUser(userId: number , status:boolean) {
    this.futureMoneyService.getAllFutureMoneyDetailStatusUser(userId,status).subscribe(
      (response) => {
        this.showSpinner();
        this.futureMoneyDetailsDto = response.data;
        this.hideSpinner();
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
        width: '40%',


      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllFutureMoneyDetailStatusUser(this.userId,this.status);
        }
      });
  }


  openEditDialog(row: any) {
    this.dialog
      .open(FutureMoneyViewComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllFutureMoneyDetailStatusUser(this.userId,this.status);
        }
      });
  }


  openDeleteDialog(row: any) {
    this.dialog
      .open(FutureMoneyDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllFutureMoneyDetailStatusUser(this.userId,this.status);
        }
      });
  }



}
