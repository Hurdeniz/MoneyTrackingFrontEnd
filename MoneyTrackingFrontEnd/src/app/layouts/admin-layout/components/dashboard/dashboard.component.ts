import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Note } from 'src/app/models/note';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NoteService } from 'src/app/services/note.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import * as _moment from 'moment';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
const moment = _moment;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent {
  jwtHelper: JwtHelperService = new JwtHelperService();
  note: Note[] = [];
  displayedColumns: string[] = ['date', 'description'];
  shipmentListDetailDto: ShipmentListDetailsDto[] = [];
  researchListDetailDto: ShipmentListDetailsDto[] = [];
  displayedColumnsShipment: string[] = [
    'date',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'adress',
    'result',
  ];
  displayedColumnsResearch: string[] = [
    'date',
    'shipmentNumber',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'description',
  ];
  dataSourceResearch: MatTableDataSource<ShipmentListDetailsDto> =
    new MatTableDataSource<ShipmentListDetailsDto>();
  dataSourceShipment: MatTableDataSource<ShipmentListDetailsDto> =
    new MatTableDataSource<ShipmentListDetailsDto>();
  dataSource: MatTableDataSource<Note> = new MatTableDataSource<Note>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userId: number;
  @ViewChild(MatPaginator) paginatorShipment: MatPaginator;
  @ViewChild(MatPaginator) paginatorResearch: MatPaginator;
  @ViewChild(MatSort) sortShipment: MatSort;
  @ViewChild(MatSort) sortResearch: MatSort;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  statusShipment: boolean = true;
  statusResearch: boolean = false;


  constructor(
    private noteService: NoteService,
    private shipmentService: ShipmentListService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllByUser();
    this.getAllShipmentListDetailByStatusAndDate();
    this.getAllResearchListDetailByStatusAndDate();
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
    }


  }

  getAllByUser() {
    this.noteService.getAllByUser(this.userId).subscribe(
      (response) => {
        this.note = response.data;
        this.dataSource = new MatTableDataSource<Note>(this.note);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  getAllShipmentListDetailByStatusAndDate() {
    this.shipmentService
      .getAllShipmentListDetailByStatusAndDate(
        this.statusShipment,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.shipmentListDetailDto = response.data;
          this.dataSourceShipment =
            new MatTableDataSource<ShipmentListDetailsDto>(
              this.shipmentListDetailDto
            );
          this.dataSourceShipment.paginator = this.paginatorShipment;
          this.dataSourceShipment.sort = this.sortShipment;

        }

      );
  }

  getAllResearchListDetailByStatusAndDate() {
    this.shipmentService
      .getAllShipmentListDetailByStatusAndDate(
        this.statusResearch,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (response) => {
          this.researchListDetailDto = response.data;
          this.dataSourceResearch =
            new MatTableDataSource<ShipmentListDetailsDto>(
              this.researchListDetailDto
            );
          this.dataSourceResearch.paginator = this.paginatorResearch;
          this.dataSourceResearch.sort = this.sortResearch;

        }
      );
  }

}
