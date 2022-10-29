import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExpenditureDetailsDto } from 'src/app/models/Dtos/expenditureDetailsDto';
import { AuthService } from 'src/app/services/auth.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { ExpenditureDeleteComponent } from './expenditure-delete/expenditure-delete.component';
import { ExpenditureViewComponent } from './expenditure-view/expenditure-view.component';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss'],
})
export class ExpenditureComponent implements OnInit {
  expenditureDetailsDto: ExpenditureDetailsDto[] = [];

  displayedColumns: string[] = ['date', 'amount', 'description', 'action'];

  dataSource: MatTableDataSource<ExpenditureDetailsDto> =
    new MatTableDataSource<ExpenditureDetailsDto>();

  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  userName: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private expenditureService:ExpenditureService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.getAllExpenditureDetailByUserId(this.userId);
  }

  filterDataSource() {
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

  getAllExpenditureDetailByUserId(userId: number) {
    this.expenditureService.getAllExpenditureDetailByUserId(userId).subscribe(
      (response) => {
        this.showSpinner();
        this.expenditureDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<ExpenditureDetailsDto>(
          this.expenditureDetailsDto
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
      .open(ExpenditureViewComponent, {
        width: '25%',

      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllExpenditureDetailByUserId(this.userId);
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(ExpenditureViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllExpenditureDetailByUserId(this.userId);
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(ExpenditureDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllExpenditureDetailByUserId(this.userId);
        }
      });
  }




}
