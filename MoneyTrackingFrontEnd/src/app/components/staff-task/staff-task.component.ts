import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { StaffTask } from 'src/app/models/staffTask';
import { AuthService } from 'src/app/services/auth.service';
import { StaffTaskService } from 'src/app/services/staff-task.service';
import * as XLSX from 'xlsx';
import { StaffTaskDeleteComponent } from './staff-task-delete/staff-task-delete.component';
import { StaffTaskViewComponent } from './staff-task-view/staff-task-view.component';

@Component({
  selector: 'app-staff-task',
  templateUrl: './staff-task.component.html',
  styleUrls: ['./staff-task.component.scss'],
})
export class StaffTaskComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  staffTask: StaffTask[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['staffTaskName', 'action'];
  dataSource: MatTableDataSource<StaffTask> =
    new MatTableDataSource<StaffTask>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;

  constructor(
    private staffTaskService: StaffTaskService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAll();
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
        if (element == 'StaffTask.Add') {
          this.add = true;
        }
        if (element == 'StaffTask.Delete') {
          this.delete = true;
        }
        if (element == 'StaffTask.Update') {
          this.update = true;
        }
        if (element == 'StaffTask.GetAll') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getAll() {
    this.staffTaskService.getAll().subscribe(
      (response) => {
        this.staffTask = response.data;
        this.dataSource = new MatTableDataSource<StaffTask>(this.staffTask);
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
      .open(StaffTaskViewComponent, {
        width: '20%',
        data: { status: true },
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
      .open(StaffTaskViewComponent, {
        width: '20%',
        data: { status: false, row },
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
      .open(StaffTaskDeleteComponent, {
        width: '20%',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAll();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('staffTaskTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Personel Görevleri');
    XLSX.writeFile(wb, 'Personel Görev Listesi.xlsx');
  }
}
