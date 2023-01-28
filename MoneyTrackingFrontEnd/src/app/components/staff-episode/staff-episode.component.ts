import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { StaffEpisode } from 'src/app/models/staffEpisode';
import { AuthService } from 'src/app/services/auth.service';
import { StaffEpisodeService } from 'src/app/services/staff-episode.service';
import * as XLSX from 'xlsx';
import { StaffEpisodeDeleteComponent } from './staff-episode-delete/staff-episode-delete.component';
import { StaffEpisodeViewComponent } from './staff-episode-view/staff-episode-view.component';

@Component({
  selector: 'app-staff-episode',
  templateUrl: './staff-episode.component.html',
  styleUrls: ['./staff-episode.component.scss'],
})
export class StaffEpisodeComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  staffEpisode: StaffEpisode[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['staffEpisodeName', 'action'];
  dataSource: MatTableDataSource<StaffEpisode> =
    new MatTableDataSource<StaffEpisode>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userRole: string[] = [];
  add: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  list: boolean = false;

  constructor(
    private staffEpisodeService: StaffEpisodeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

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
        if (element == 'StaffEpisode.Add') {
          this.add = true;
        }
        if (element == 'StaffEpisode.Delete') {
          this.delete = true;
        }
        if (element == 'StaffEpisode.Update') {
          this.update = true;
        }
        if (element == 'StaffEpisode.GetAll') {
          this.list = true;
        }
      });
    }
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getAll() {
    this.staffEpisodeService.getAll().subscribe(
      (response) => {
        this.staffEpisode = response.data;
        this.dataSource = new MatTableDataSource<StaffEpisode>(
          this.staffEpisode
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
      .open(StaffEpisodeViewComponent, {
        width: '400px',
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
      .open(StaffEpisodeViewComponent, {
        width: '400px',
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
      .open(StaffEpisodeDeleteComponent, {
        width: '460px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAll();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('staffEpisodeTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Personel Bölümleri');
    XLSX.writeFile(wb, 'Personel Bölüm Listesi.xlsx');
  }
}
