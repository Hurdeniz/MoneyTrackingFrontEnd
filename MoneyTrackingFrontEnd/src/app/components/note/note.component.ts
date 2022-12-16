import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  note: Note[] = [];
  dataLoaded = false;
  searchHide = false;
  isAuthenticated: boolean = false;
  filterText: '';
  userId: number;
  displayedColumns: string[] = ['date', 'description', 'action'];
  dataSource: MatTableDataSource<Note> = new MatTableDataSource<Note>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private noteService: NoteService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.getAllByUser();
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
    }
  }

  getAllByUser() {
    this.noteService.getAllByUser(this.userId).subscribe(
      (response) => {
        this.note = response.data;
        this.dataSource = new MatTableDataSource<Note>(this.note);
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
      .open(NoteViewComponent, {
        width: '400px',
        data: { status: true, userId:this.userId },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllByUser();
        }
      });
  }

  openEditDialog(row: any) {
    this.dialog
      .open(NoteViewComponent, {
        width: '400px',
        data: { status: false, row },
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllByUser();
        }
      });
  }

  openDeleteDialog(row: any) {
    this.dialog
      .open(NoteDeleteComponent, {
        width: '450px',
        data: row,
        disableClose:true
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllByUser();
        }
      });
  }

  exportXlsx() {
    let element = document.getElementById('noteTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kart İşlemleri');
    XLSX.writeFile(wb, 'Kredi Kartı İşlemleri.xlsx');
  }
}
