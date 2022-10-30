import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ShipmentListDetailsDto } from 'src/app/models/Dtos/shipmentListDetailsDto';
import { ShipmentList } from 'src/app/models/shipmentList';
import { AuthService } from 'src/app/services/auth.service';
import { ShipmentListService } from 'src/app/services/shipment-list.service';
import { ShipmentListDeleteComponent } from './shipment-list-delete/shipment-list-delete.component';
import { ShipmentListEnterResultComponent } from './shipment-list-enter-result/shipment-list-enter-result.component';
import { ShipmentListViewComponent } from './shipment-list-view/shipment-list-view.component';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {
  shipmentListDetailDto:ShipmentListDetailsDto[]=[];
  shipmentListForm: FormGroup;
  displayedColumns: string[] = [
    'date',
    'shipmentNumber',
    'customerCode',
    'customerNameSurname',
    'promissoryNumber',
    'adress',
    'status',
    'action'
  ];

  dataSource: MatTableDataSource<ShipmentListDetailsDto> =
  new MatTableDataSource<ShipmentListDetailsDto>();
 dataLoaded = false;
 searchHide = false;
 isAuthenticated: boolean = false;
 filterText: '';
 userId: number;
 jwtHelper: JwtHelperService = new JwtHelperService();
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(
    private shipmentService:ShipmentListService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getAllShipmentListDetail();
    this.createShipmentListForm();
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
      let userId = Object.keys(decode).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = decode[userId];
    }
  }

  getAllShipmentListDetail() {
    this.shipmentService.getAllShipmentListDetail().subscribe(
      (response) => {
        this.showSpinner();
        this.shipmentListDetailDto = response.data;
        this.hideSpinner();
        this.dataSource = new MatTableDataSource<ShipmentListDetailsDto>(
          this.shipmentListDetailDto
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

  createShipmentListForm() {
      this.shipmentListForm = this.formBuilder.group({
        userId:[this.userId],
        shipmentNumber:[''],
        customerCode:[''],
        customerNameSurname:[''],
        promissoryNumber:[''],
        adress:[''],
        date:[''],
        status: [''],
      });
  }

  add()
  {
    if (this.shipmentListForm.valid) {
      let shipmentListModel = Object.assign({}, this.shipmentListForm.value);
      this.shipmentService.add(shipmentListModel).subscribe(
        (response) => {

          this.toastrService.success(response.message, 'Başarılı');
          this.shipmentListForm.reset();
          this.getAllShipmentListDetail();

        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik', 'Dikkat');
    }

  }


  openEditDialog(row: any) {
    this.dialog
      .open(ShipmentListViewComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllShipmentListDetail();
        }
      });
  }


  openDeleteDialog(row: any) {
    this.dialog
      .open(ShipmentListDeleteComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'delete') {
          this.getAllShipmentListDetail();
        }
      });
  }

  openEnterResultDialog(row: any) {
    this.dialog
      .open(ShipmentListEnterResultComponent, {
        width: '25%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'result') {
          this.getAllShipmentListDetail();
        }
      });
  }


}
