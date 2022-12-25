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
import { StaffBackspaceComponent } from './staff-backspace/staff-backspace.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  staffDetailsDto: StaffDetailsDto[] = [];
  displayedActiveColumns: string[] = [
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
    'actions',
  ];
  displayedPassiveColumns: string[] = [
    'identityNumber',
    'nameSurname',
    'phone1',
    'phone2',
    'email',
    'staffEpisodeName',
    'staffTaskName',
    'dateOfEntryIntoWork',
    'dateOfDismissal',
    'province',
    'district',
    'adress',
    'actions',
  ];
  dataSource: MatTableDataSource<StaffDetailsDto> =
    new MatTableDataSource<StaffDetailsDto>();
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  isChecked = true;
  slideName: string='Aktif';
  status:boolean = true;
  tableActive: boolean = true;
  tablePassive: boolean = false;
  addButton: boolean = true;
  editButton: boolean = true;



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private staffService: StaffService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllStaffDetailByStatus();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  staffStatus() {
    if (this.isChecked == true) {
      this.slideName='Aktif'
      this.status = true;
      this.tableActive = true;
      this.tablePassive = false;
      this.addButton = true;
      this.searchHide=false;

      this.getAllStaffDetailByStatus();
    }
    else if (this.isChecked == false) {
      this.slideName='Pasif'
      this.status = false;
      this.tablePassive = true;
      this.tableActive = false;
      this.addButton = false;
      this.searchHide=false;

      this.getAllStaffDetailByStatus();

    }

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
        width: '620px',
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
        width: '620px',
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
        width: '450px',
        data: row,
        disableClose: true
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
        width: '400px',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'checkout') {
          this.getAllStaffDetailByStatus();
        }
      });
  }

  openBackspaceDialog(row: any) {
    this.dialog
      .open(StaffBackspaceComponent, {
        width: '450px',
        data: row,
        disableClose: true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'backspace') {
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
