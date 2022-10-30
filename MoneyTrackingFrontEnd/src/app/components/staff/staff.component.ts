import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StaffDetailsDto } from 'src/app/models/Dtos/staffDetailsDto';
import { StaffService } from 'src/app/services/staff.service';
import { StaffDeleteComponent } from './staff-delete/staff-delete.component';
import { StaffViewComponent } from './staff-view/staff-view.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staffDetailsDto:StaffDetailsDto[]=[];

  displayedColumns: string[] = [
    'identityNumber',
    'nameSurname',
    'phone1',
    'phone2',
    'email',
    'staffEpisodeName',
    'staffTaskName',
    'dateOfEntryIntoWork',
    'province',
    'district',
    'adress',
    'action'
  ];
  dataSource: MatTableDataSource<StaffDetailsDto> =
  new MatTableDataSource<StaffDetailsDto>();
 dataLoaded = false;
 searchHide = false;
 filterText: '';
 status: boolean=true;
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private staffService:StaffService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllStaffDetailByStatus();
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

  getAllStaffDetailByStatus() {
    this.staffService.getAllStaffDetailByStatus(this.status).subscribe(
      (response) => {
        this.showSpinner();
        this.staffDetailsDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<StaffDetailsDto>(
          this.staffDetailsDto
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
      .open(StaffViewComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllStaffDetailByStatus();
        }
      });
  }


  openEditDialog(row: any) {
    this.dialog
      .open(StaffViewComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllStaffDetailByStatus();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(StaffDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllStaffDetailByStatus();
        }
      });
  }


}
