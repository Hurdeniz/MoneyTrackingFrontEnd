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
import { CancellationService } from 'src/app/services/cancellation.service';
import { FutureMoneyService } from 'src/app/services/future-money.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { CardPaymentService } from 'src/app/services/card-payment.service';
import { Sum } from 'src/app/models/Dtos/sum';
import { Count } from 'src/app/models/Dtos/count';
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
  dataSource: MatTableDataSource<Note> = new MatTableDataSource<Note>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAuthenticated: boolean = false;
  userId: number;
  date = moment().format('YYYY-MM-DD');
  total:Sum;
  shipmentCount:Count;
  cardPaymentSum:number;
  expenditureSum:number;
  futureMoneySum:number;
  cancellationSum:number;
  shipmentListCount:number;
  researchListCount:number;
  statusShipmentList: boolean = true;
  statusResearchList: boolean = false;



  constructor(
    private noteService: NoteService,
    private cardPaymentService:CardPaymentService,
    private cancellationService:CancellationService,
    private futureMoneyService:FutureMoneyService,
    private expenditureService:ExpenditureService,
    private shipmentListService: ShipmentListService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.tokenAndUserControl();
    this.getAllByUser();
    this.getCardPaymentSum();
    this.getExpenditureSum();
    this.getFutureMoneySum();
    this.getCancellationSum();
    this.getShipmentListCount();
    this.getResearchListCount();

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

  getCardPaymentSum() {
    this.cardPaymentService.getSumByDateAndUser(this.date,this.userId).subscribe((response) => {
      this.total=response.data
       this.cardPaymentSum=this.total.sum;
    })
  }

  getExpenditureSum() {
    this.expenditureService.getSumByDateAndUser(this.date,this.userId).subscribe((response) => {
      this.total=response.data
       this.expenditureSum=this.total.sum;
    })
  }

  getFutureMoneySum() {
    this.futureMoneyService.getSumByDateAndUser(this.date,this.userId).subscribe((response) => {
      this.total=response.data
       this.futureMoneySum=this.total.sum;
    })
  }

  getCancellationSum() {
    this.cancellationService.getSumByDateAndUser(this.date,this.userId).subscribe((response) => {
      this.total=response.data;
       this.cancellationSum=this.total.sum;
    })
  }

  getShipmentListCount() {
    this.shipmentListService.getCountByDate(this.date,this.statusShipmentList).subscribe((response) => {
    this.shipmentCount=response.data;
    this.shipmentListCount=this.shipmentCount.count;

    })
  }

  getResearchListCount() {
    this.shipmentListService.getCountByDate(this.date,this.statusResearchList).subscribe((response) => {
    this.shipmentCount=response.data;
    this.researchListCount=this.shipmentCount.count;

    })
  }



}
