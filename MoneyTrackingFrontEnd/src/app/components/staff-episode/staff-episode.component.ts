import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StaffEpisode } from 'src/app/models/staffEpisode';
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
  staffEpisode: StaffEpisode[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['staffEpisodeName', 'action'];
  dataSource: MatTableDataSource<StaffEpisode> =
    new MatTableDataSource<StaffEpisode>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private staffEpisodeService: StaffEpisodeService,
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
      .open(StaffEpisodeViewComponent, {
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
      .open(StaffEpisodeDeleteComponent, {
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
    let element = document.getElementById('staffEpisodeTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Personel Bölümleri');
    XLSX.writeFile(wb, 'Personel Bölüm Listesi.xlsx');
  }
}
