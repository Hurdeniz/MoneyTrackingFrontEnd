import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StaffTask } from 'src/app/models/staffTask';
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
  staffTask: StaffTask[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['staffTaskName', 'action'];
  dataSource: MatTableDataSource<StaffTask> =
    new MatTableDataSource<StaffTask>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private staffTaskService: StaffTaskService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();
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
