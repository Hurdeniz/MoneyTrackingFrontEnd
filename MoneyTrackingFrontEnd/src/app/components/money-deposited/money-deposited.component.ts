import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { MoneyDepositedDetailsDto } from 'src/app/models/Dtos/moneyDepositedDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { MoneyDepositedService } from 'src/app/services/money-deposited.service';
import { MoneyDepositedDeleteComponent } from './money-deposited-delete/money-deposited-delete.component';
import { MoneyDepositedViewComponent } from './money-deposited-view/money-deposited-view.component';

@Component({
  selector: 'app-money-deposited',
  templateUrl: './money-deposited.component.html',
  styleUrls: ['./money-deposited.component.scss']
})
export class MoneyDepositedComponent implements OnInit {
  moneyDepositedDetailsDto : MoneyDepositedDetailsDto[]=[];


  displayedColumns: string[] = [
    'date',
    'bankName',
    'amount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<MoneyDepositedDetailsDto> =
  new MatTableDataSource<MoneyDepositedDetailsDto>();
dataLoaded = false;
searchHide = false;
isAuthenticated: boolean = false;
filterText: '';
jwtHelper: JwtHelperService = new JwtHelperService();
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;



  constructor(
    private moneyDepositedService:MoneyDepositedService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllMoneyDepositedDetail();
  }

  filterCardPayments() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  getAllMoneyDepositedDetail() {
    this.moneyDepositedService.getAllMoneyDepositedDetail().subscribe(
      (response) => {
        this.showSpinner();
        this.moneyDepositedDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<MoneyDepositedDetailsDto>(
          this.moneyDepositedDetailsDto
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
      .open(MoneyDepositedViewComponent, {
        width: '25%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllMoneyDepositedDetail();
        }
      });
  }


  openEditDialog(row: any) {
    this.dialog
      .open(MoneyDepositedViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllMoneyDepositedDetail();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(MoneyDepositedDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllMoneyDepositedDetail();
        }
      });
  }

}
