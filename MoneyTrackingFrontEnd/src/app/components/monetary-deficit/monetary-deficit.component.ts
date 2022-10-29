import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MonetaryDeficit } from 'src/app/models/monetaryDeficit';
import { MonetaryDeficitService } from 'src/app/services/monetary-deficit.service';
import { MonetaryDeficitDeleteComponent } from './monetary-deficit-delete/monetary-deficit-delete.component';
import { MonetaryDeficitViewComponent } from './monetary-deficit-view/monetary-deficit-view.component';

@Component({
  selector: 'app-monetary-deficit',
  templateUrl: './monetary-deficit.component.html',
  styleUrls: ['./monetary-deficit.component.scss'],
})
export class MonetaryDeficitComponent implements OnInit {
  monetaryDeficit: MonetaryDeficit[] = [];
  displayedColumns: string[] = ['date','nameSurname', 'amount', 'description', 'action'];
  dataSource: MatTableDataSource<MonetaryDeficit> =
    new MatTableDataSource<MonetaryDeficit>();
  dataLoaded = false;
  searchHide = false;
  status: boolean = true;
  isAuthenticated: boolean = false;
  filterText: '';
  jwtHelper: JwtHelperService = new JwtHelperService();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private monetaryDeficitService:MonetaryDeficitService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

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
    this.monetaryDeficitService.getAll(this.status).subscribe(
      (response) => {
        this.showSpinner();
        this.monetaryDeficit = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<MonetaryDeficit>(
          this.monetaryDeficit
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
      .open(MonetaryDeficitViewComponent, {
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
      .open(MonetaryDeficitViewComponent, {
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
      .open(MonetaryDeficitDeleteComponent, {
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
