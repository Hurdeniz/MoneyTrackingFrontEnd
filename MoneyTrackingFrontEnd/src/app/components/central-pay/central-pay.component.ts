import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CentralPay } from 'src/app/models/centralPay';
import { CentralPayService } from 'src/app/services/central-pay.service';
import { CentralPayDeleteComponent } from './central-pay-delete/central-pay-delete.component';
import { CentralPayViewComponent } from './central-pay-view/central-pay-view.component';

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
 isAuthenticated: boolean = false;
 filterText: '';
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private centralPayService:CentralPayService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAll();
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


  getAll() {
    this.centralPayService.getAll().subscribe(
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
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAll();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CentralPayViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAll();
        }
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
          this.getAll();
        }
      });
  }


}
