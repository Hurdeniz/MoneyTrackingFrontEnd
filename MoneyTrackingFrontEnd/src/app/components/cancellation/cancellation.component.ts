import { Component, OnInit, ViewChild } from '@angular/core';
import { CancellationFilterComponent } from './cancellation-filter/cancellation-filter.component';
import { CancellationViewComponent } from './cancellation-view/cancellation-view.component';
import { CancellationDeleteComponent } from './cancellation-delete/cancellation-delete.component';
import { CancellationService } from 'src/app/services/cancellation.service';
import { CancellationDetailsDto } from 'src/app/models/Dtos/cancellationDetailsDto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss'],
})
export class CancellationComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  cancellationDetailsDto: CancellationDetailsDto[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = [
    'date',
    'userNameSurname',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'transactionAmount',
    'cancellationAmount',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<CancellationDetailsDto> =
    new MatTableDataSource<CancellationDetailsDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;

  constructor(
    private cancellationService: CancellationService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllCancellationDetailByDate();
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
        this.add = true;
        this.delete = true;
        this.update = true;
        this.list = true;
      }
    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin') {
          this.add = true;
          this.delete = true;
          this.update = true;
          this.list = true;
        }

        if (element == 'Cancellation.Add') {
          this.add = true;
        }
        if (element == 'Cancellation.Delete') {
          this.delete = true;
        }
        if (element == 'Cancellation.Update') {
          this.update = true;
        }
        if (element == 'Cancellation.GetAllCancellationDetailByDate') {
          this.list = true;
        }
      })

    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }
  getTotalCost() {
    return this.cancellationDetailsDto.map(t => t.cancellationAmount).reduce((acc, value) => acc + value, 0);
  }

  getAllCancellationDetailByDate() {
    this.cancellationService
      .getAllCancellationDetailByDate(this.startDate, this.endDate)
      .subscribe(
        (response) => {
          this.cancellationDetailsDto = response.data;
          this.dataSource = new MatTableDataSource<CancellationDetailsDto>(
            this.cancellationDetailsDto
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
      .open(CancellationViewComponent, {
        width: '600px',
        data: { status: true },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllCancellationDetailByDate();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(CancellationViewComponent, {
        width: '600px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllCancellationDetailByDate();
        }
      });
  }

  openFilterDialog() {
    this.dialog
      .open(CancellationFilterComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value == undefined) {
          this.getAllCancellationDetailByDate();
        } else {
          this.startDate = value.startDate.format('YYYY-MM-DD');
          this.endDate = value.endDate.format('YYYY-MM-DD');
          this.getAllCancellationDetailByDate();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(CancellationDeleteComponent, {
        width: '450px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllCancellationDetailByDate();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('cancellationTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'İptal İşlemleri');
    XLSX.writeFile(wb, 'İptal İşlemleri.xlsx');
  }
}
