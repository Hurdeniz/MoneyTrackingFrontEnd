import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { NoteViewComponent } from './note-view/note-view.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  note:Note[]=[];

  displayedColumns: string[] = [
    'date',
    'description',
    'action'
  ];
  dataSource: MatTableDataSource<Note> =
  new MatTableDataSource<Note>();
 dataLoaded = false;
 searchHide = false;
 isAuthenticated: boolean = false;
 filterText: '';
 userId: number;
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private noteService:NoteService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllByUser();
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

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let userName = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
    }
  }

  getAllByUser() {
    this.noteService.getAllByUser(this.userId).subscribe(
      (response) => {
        this.showSpinner();
        this.note = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<Note>(
          this.note
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
      .open(NoteViewComponent, {
        width: '25%',
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
        width: '25%',
        data: row,
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
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllByUser();
        }
      });
  }

}
