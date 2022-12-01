import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffDeleteComponent } from './staff-delete/staff-delete.component';
import { StaffViewComponent } from './staff-view/staff-view.component';
import { StaffService } from 'src/app/services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { StaffDetailsDto } from 'src/app/models/Dtos/staffDetailsDto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { StaffCheckOutComponent } from './staff-check-out/staff-check-out.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  staffDetailsDto: StaffDetailsDto[] = [];
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
    'action',
  ];
  dataSource: MatTableDataSource<StaffDetailsDto> =
    new MatTableDataSource<StaffDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  status: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private staffService: StaffService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllStaffDetailByStatus();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  getAllStaffDetailByStatus() {
    this.staffService.getAllStaffDetailByStatus(this.status).subscribe(
      (response) => {
        this.staffDetailsDto = response.data;
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
        data: { status: true },
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
        data: { status: false, row },
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
  openCheckOutDialog(row: any) {
    this.dialog
      .open(StaffCheckOutComponent, {
        width: '20%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'checkout') {
          this.getAllStaffDetailByStatus();
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
