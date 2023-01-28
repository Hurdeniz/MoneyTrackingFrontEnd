import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserOperationsSettingComponent } from './user-operations-setting/user-operations-setting.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserViewComponent } from './user-view/user-view.component';
import * as XLSX from 'xlsx';
import { UserPasswordResetComponent } from './user-password-reset/user-password-reset.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  user: User[] = [];
  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'actions',
  ];
  dataSource: MatTableDataSource<User> =
    new MatTableDataSource<User>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  isChecked = true;
  userId: number;
  slideName: string = 'Aktif';
  status: boolean = true;
  tableActive: boolean = true;
  tablePassive: boolean = false;
  addButton: boolean = true;
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  update: boolean = false;
  updateStatus: boolean = false;
  updatePassword: boolean = false;
  userOperation: boolean = false;
  list: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }


  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllUserByStatus();
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
        this.update = true;
        this.updateStatus = true;
        this.updatePassword = true;
        this.userOperation = true;
        this.list = true;

      }
    }
    else {
      this.userRole.forEach(element => {
        if (element == 'Admin') {
          this.add = true;
          this.update = true;
          this.updateStatus = true;
          this.updatePassword = true;
          this.userOperation = true;
          this.list = true;

        }
        if (element == 'User.Add') {
          this.add = true;
        }
        if (element == 'User.Update') {
          this.update = true;
        }
        if (element == 'User.UpdatePassword') {
          this.updatePassword = true;
        }
        if (element == 'User.UpdateStatus') {
          this.updateStatus = true;
        }
        if (element == 'User.Operations') {
          this.userOperation = true;
        }
        if (element == 'User.GetAllUserByStatus') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getAllUserByStatus() {
    this.userService.getAllUserByStatus(this.status).subscribe(
      (response) => {
        this.user = response.data;
        this.dataSource = new MatTableDataSource<User>(
          this.user
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

  userStatus() {
    if (this.isChecked == true) {
      this.slideName = 'Aktif'
      this.status = true;
      this.tableActive = true;
      this.tablePassive = false;
      this.addButton = true;
      this.searchHide = false;
      this.getAllUserByStatus();
    }
    else if (this.isChecked == false) {
      this.slideName = 'Pasif'
      this.status = false;
      this.tablePassive = true;
      this.tableActive = false;
      this.addButton = false;
      this.searchHide = false;
      this.getAllUserByStatus();
    }
  }

  openAddDialog() {
    this.dialog
      .open(UserAddComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllUserByStatus();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(UserEditComponent, {
        width: '350px',
        data:  row
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllUserByStatus();
        }
      });
  }

  openUserPasswordResetDialog(row: any ) {
    this.dialog
      .open(UserPasswordResetComponent, {
        width: '550px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'updatePassword') {
          this.getAllUserByStatus();
        }
      });
  }

  openUserStatusDialog(row: any, status:boolean) {
    this.dialog
      .open(UserStatusComponent, {
        width: '450px',
        data: {row,status},
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'userStatus') {
          this.getAllUserByStatus();
        }
      });
  }


  exportXlsx() {
    let element = document.getElementById('staffTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Aktif Personeller');
    XLSX.writeFile(wb, 'Personel Listesi.xlsx');
  }


}




